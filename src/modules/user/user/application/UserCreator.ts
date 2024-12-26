import { User, type UserPrimitives } from "../domain/User"
import { UserId } from "../domain/UserId"
import { type UserRepository } from "../domain/UserRepository"

export class UserCreator {
  constructor(readonly repository: UserRepository) { }

  async create({ id, name, lastName, email, roleId }: UserPrimitives): Promise<void> {
    const user = User.create({ name, lastName, email, roleId }).toPrimitives()

    if (id === undefined) {
      return await this.repository.register({ payload: user })
    } else {
      const userId = new UserId(id).value
      return await this.repository.update({ id: userId, payload: user })
    }
  }
}
