import { useCallback } from "react"
import { ApiUserRepository } from "../../../modules/user/user/infrastructure/UserApiRepository"
import { UserGetter } from '../../../modules/user/user/application/UserGetter'
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type UserId } from "../../../modules/user/user/domain/UserId"
import { type UserPrimitives } from "../../../modules/user/user/domain/User"

export const useGetUser = (): {
    getUser: ({ id }: {
        id: Primitives<UserId>;
    }) => Promise<UserPrimitives>
} => {
    return {
        getUser: useCallback(async ({ id }: { id: Primitives<UserId> }) => {
            return await new UserGetter(new ApiUserRepository()).getById({ id })
        }, [])
    }
}

