import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserPrimitives } from '../domain/User'
import { type UserRepository } from '../domain/UserRepository'
import { UserEmail } from '../domain/UserEmail'
import { UserId } from '../domain/UserId'

export class UserGetter {
  constructor(readonly repository: UserRepository) { }
  async getById({ id }: { id: Primitives<UserId> }): Promise<UserPrimitives | null> {
    const userId = new UserId(id).value
    return await this.repository.getById({ id: userId }) ?? null
  }
  async getByEmail({ email }: { email: Primitives<UserEmail> }): Promise<UserPrimitives | null> {
    const userEmail = new UserEmail(email).value
    return await this.repository.getByEmail({ email: userEmail }) ?? null
  }
}
