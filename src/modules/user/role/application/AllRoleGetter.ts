import { type RolePrimitives } from '../domain/Role'
import { RoleRepository } from '../domain/RoleRepository'

export class AllRoleGetter {
  constructor (private readonly repository: RoleRepository) {}

  async get (): Promise<RolePrimitives[]> {
    return await this.repository.getAll()
  }
}
