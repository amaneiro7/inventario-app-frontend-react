import { useCallback } from "react"
import { ApiUserRepository } from "../../../modules/user/user/infrastructure/UserApiRepository"
import { UserRemover } from "../../../modules/user/user/application/UserRemover"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type UserId } from "../../../modules/user/user/domain/UserId"

export const useDeleteUser = (): {
    deleteUser: ({ id }: { id: Primitives<UserId> }) => Promise<void>
} => {
    return {
        deleteUser: useCallback(async ({ id }: { id: Primitives<UserId> }) => {
            return await new UserRemover(new ApiUserRepository()).run({ id })
        }, [])
    }
}