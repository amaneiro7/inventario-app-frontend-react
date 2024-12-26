import { makeRequest } from "@/modules/shared/infraestructure/fetching"
import { type UserPrimitives } from "../../user/domain/User"
import { type AuthRepository } from "../domain/AuthRepository"


export class ApiAuthRepository implements AuthRepository {
  async loginLocal({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives & { accessToken: string }> {
    return await makeRequest({
      method: 'POST',
      url: 'auth/login/local',
      data: { email, password }
    })
  }

  async refreshToken(): Promise<UserPrimitives & { accessToken: string }> {
    return await makeRequest({ url: 'auth/refresh-token', method: 'GET' })
  }

  async checkToken(): Promise<UserPrimitives & { accessToken: string } | null> {
    const localToken = localStorage.getItem('user')

    if (localToken) {
      if (!this.isTokenExpired(JSON.parse(localToken).accessToken)) {
        console.info('Token no ha expirado')
        return JSON.parse(localToken)
      }
    }
    // Si el token ha expirado o no existe, intentar refrescarlo
    try {
      const response = await this.refreshToken()
      localStorage.setItem('user', JSON.stringify(response))
      console.info('Token generado por el servidor')
      return response
    } catch (error) {
      // Si no se puede refrescar el token, devolver null
      // El usuario deberá iniciar sesión nuevamente
      if (import.meta.env.MODE === 'development') {
        console.error(error)
      }
      return null
    }
  }

  isTokenExpired(token: string): boolean {
    // Lógica para verificar si el token ha expirado
    // Retorna true si el token ha expirado, false en caso contrario
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    // Obtener la fecha de expiración del token
    const expirationDate = new Date(tokenData.exp * 1000)
    // Obtener la fecha actual
    const currentDate = new Date()
    // Comparar las fechas
    return currentDate > expirationDate
  }

  async logout(): Promise<void> {
    await makeRequest({ url: 'auth/logout', method: 'POST' })
  }

  async changePassword({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }): Promise<void> {
    return await makeRequest({ url: 'users/change-password', method: 'PATCH', data: { password, newPassword, reTypePassword } })
  }
}
