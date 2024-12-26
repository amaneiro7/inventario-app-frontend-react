import { type UserPrimitives } from '../domain/User'
import { type UserRepository } from '../domain/UserRepository'

export class AllUserGetter {
    constructor(private readonly repository: UserRepository) { }
    async get(): Promise<UserPrimitives[]> {

        return await this.repository.getAll()
    }
}
