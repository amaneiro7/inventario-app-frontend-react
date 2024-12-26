import { type MemoryRamTypePrimitives } from './MemoryRamType'

export abstract class MemoryRamTypeRepository {
  abstract getAll (): Promise<MemoryRamTypePrimitives[]>
}
