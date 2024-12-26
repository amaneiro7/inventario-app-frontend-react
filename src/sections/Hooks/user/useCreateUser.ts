import { useCallback } from 'react'
import { type UserPrimitives } from '../../../modules/user/user/domain/User'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'
import { UserCreator } from '../../../modules/user/user/application/UserCreator'


export const useCreateUser = (): {
    createUser: (formData: UserPrimitives) => Promise<void>
} => {
    return {
        createUser: useCallback(async (formData: UserPrimitives) => {
            return await new UserCreator(new ApiUserRepository()).create(formData)
        }, [])
    }
}
