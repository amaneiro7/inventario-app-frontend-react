import { type OperatingSystemArqPrimitives } from './OperatingSystemArq'

export abstract class OperatingSystemArqRepository {
  abstract getAll (): Promise<OperatingSystemArqPrimitives[]>
}
