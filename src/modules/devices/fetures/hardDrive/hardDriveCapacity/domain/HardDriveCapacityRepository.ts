import { type HardDriveCapacityPrimitives } from './HardDriveCapacity'

export abstract class HardDriveCapacityRepository {
  abstract getAll (): Promise<HardDriveCapacityPrimitives[]>
}
