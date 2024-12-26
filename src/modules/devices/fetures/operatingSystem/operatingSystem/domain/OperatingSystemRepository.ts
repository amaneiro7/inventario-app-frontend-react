import { type OperatingSystemPrimitives } from './OperatingSystem'

export abstract class OperatingSystemRepository {
  abstract getAll (): Promise<OperatingSystemPrimitives[]>
}
