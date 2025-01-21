import { type UserPrimitives } from '../domain/User'
import { type UserRepository } from '../domain/UserRepository'

export class AllUserGetter {
	constructor(private readonly userRepository: UserRepository) {}
	async get(): Promise<UserPrimitives[]> {
		return await this.userRepository.getAll()
	}
}
