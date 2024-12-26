import { type HardDriveTypePrimitives } from './HardDriveType'

export abstract class HardDriveTypeRepository {
  abstract getAll (): Promise<HardDriveTypePrimitives[]>
}
