import { type ProcessorPrimitives, type Processor } from './Processor'
import { type ProcessorId } from './ProcessorId'

export abstract class ProcessorRepository {
  abstract save ({ processor }: { processor: Processor }): Promise<void>

  abstract update ({ id, processor }: { id: ProcessorId, processor: Processor }): Promise<void>

  abstract getAll (): Promise<ProcessorPrimitives[]>

  abstract getById ({ id }: { id: ProcessorId }): Promise<ProcessorPrimitives | null>
}
