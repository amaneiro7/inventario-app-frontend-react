import { type HardDriveTypePrimitives } from '../domain/HardDriveType'
import { HardDriveTypeRepository } from '../domain/HardDriveTypeRepository'

export class AllHardDriveTypeGetter {
  constructor (readonly repository: HardDriveTypeRepository) {}

  async get (): Promise<HardDriveTypePrimitives[]> {
    return await this.repository.getAll()
  }
}
