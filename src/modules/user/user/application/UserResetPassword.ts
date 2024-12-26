import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'

export class UserResetPassword {
    constructor(readonly repository: UserRepository) { }
    async reset({ id }: { id: Primitives<UserId> }): Promise<void> {
        const userId = new UserId(id).value
        return await this.repository.resetPassword({ id: userId })
    }
}
