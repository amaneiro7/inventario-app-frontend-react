import { type RolePrimitives } from './Role'

export abstract class RoleRepository {
  abstract getAll (): Promise<RolePrimitives[]>
}
