import { useCallback } from 'react'
import { ChangePassword, type ChangePasswordParams } from '../../../modules/user/user/application/changePassoword'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'

export interface UseUser {
  changePassword: (formData: ChangePasswordParams) => Promise<void>
}

export const useUserChangePassword = (): UseUser => {
  return {
    changePassword: useCallback(async (formData: ChangePasswordParams) => {
      return await new ChangePassword(new ApiUserRepository()).run(formData)
    }, [])
  }
}
