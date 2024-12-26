import { type MemoryRamTypePrimitives } from '../domain/MemoryRamType'
import { MemoryRamTypeRepository } from '../domain/MemoryRamTypeRepository'

export class AllMemoryRamTypeGetter {
  constructor (readonly repository: MemoryRamTypeRepository) {}

  async get (): Promise<MemoryRamTypePrimitives[]> {
    return await this.repository.getAll()
  }
}
