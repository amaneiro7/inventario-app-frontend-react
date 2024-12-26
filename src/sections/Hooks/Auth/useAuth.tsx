import { useCallback, useLayoutEffect, useState } from 'react'
import { type InternalAxiosRequestConfig } from 'axios'

import { api } from '@/modules/shared/infraestructure/fetching'
import { Login } from '@/modules/user/auth/application/Login'
import { RefreshToken } from '@/modules/user/auth/application/refreshToken'
import { CheckToken } from '@/modules/user/auth/application/checkToken'
import { Logout } from '@/modules/user/auth/application/logout'

import { type Repository } from '@/modules/shared/domain/repository'
import { type UserPrimitives } from '@/modules/user/user/domain/User'
import { useLocation } from 'react-router-dom'

export interface UseAuth {
    getLogin: ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) => Promise<UserPrimitives>
    user: UserPrimitives | null
    logout: () => Promise<void>
    loading: boolean
    isSignIn: boolean
}

export const useLogin = (repository: Repository): UseAuth => {
    const [authState, setAuthState] = useState<{
        user: UserPrimitives | null
        isSignin: boolean
        token: string
    }>({
        user: null,
        isSignin: false,
        token: null
    })
    const [loading, setLoading] = useState<boolean>(false)
    const location = useLocation()

    async function getLogin({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
        setLoading(true)
        return await new Login(repository)
            .run(email, password)
            .then((user) => {
                setAuthState({
                    user,
                    isSignin: true,
                    token: user.accessToken
                })
                return user
            })
            .finally(() => setLoading(false))
    }

    const logout = useCallback(async () => {
        setAuthState({
            user: null,
            isSignin: false,
            token: null
        })
        await new Logout(repository).run()
    }, [repository])

    const handleCheckToken = useCallback(async () => {
        try {
            const response = await new CheckToken(repository).run()
            if (response) {
                setAuthState({
                    user: response,
                    isSignin: true,
                    token: response.accessToken
                })
            } else {
                logout()
            }
        } catch (error) {
            console.error('Error al verificar el token:', error)
            logout()
        }
    }, [logout, repository])


    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config: InternalAxiosRequestConfig & {
            _retry?: boolean
        }) => {
            config.headers.Authorization =
                !config._retry && authState.token
                    ? `Bearer ${authState.token}`
                    : config.headers.Authorization
            return config
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [authState.token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                if (
                    error.response.status === 401 &&
                    error.response.data === 'Unauthorized'
                ) {
                    try {
                        const response = await new RefreshToken(repository).run()
                        setAuthState({
                            user: response,
                            isSignin: true,
                            token: response.accessToken
                        })

                        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
                        originalRequest._retry = true

                        return api(originalRequest)
                    } catch {
                        logout()
                    }
                }
                return Promise.reject(error)
            }
        )
        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [logout, repository])

    useLayoutEffect(() => {
        if (location.pathname === '/login') return
        handleCheckToken()
    }, [handleCheckToken, location.pathname])


    return {
        getLogin,
        logout,
        loading,
        user: authState.user,
        isSignIn: authState.isSignin
    }
}
