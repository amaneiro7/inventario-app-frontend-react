import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'
import { HardDriveCapacityRepository } from '../domain/HardDriveCapacityRepository'

export class AllHardDriveCapacityGetter {
  constructor (readonly repository: HardDriveCapacityRepository) {}

  async get (): Promise<HardDriveCapacityPrimitives[]> {
    return await this.repository.getAll()
  }
}
