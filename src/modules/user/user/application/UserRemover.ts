import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'

export class UserRemover {
    constructor(readonly repository: UserRepository) { }
    async run({ id }: { id: Primitives<UserId> }): Promise<void> {
        const userId = new UserId(id).value
        return await this.repository.deleteUser({ id: userId })
    }
}
