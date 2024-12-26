import { useCallback } from "react"
import { ApiUserRepository } from "../../../modules/user/user/infrastructure/UserApiRepository"
import { UserResetPassword } from '../../../modules/user/user/application/UserResetPassword'
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type UserId } from "../../../modules/user/user/domain/UserId"

export const useResetUserPassword = (): {
    resetUserPassword: ({ id }: { id: Primitives<UserId> }) => Promise<void>
} => {
    return {
        resetUserPassword: useCallback(async ({ id }: { id: Primitives<UserId> }) => {
            return await new UserResetPassword(new ApiUserRepository()).reset({ id })
        }, [])
    }
}

