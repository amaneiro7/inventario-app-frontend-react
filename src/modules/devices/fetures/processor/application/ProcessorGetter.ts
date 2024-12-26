import { Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorId } from '../domain/ProcessorId'
import { ProcessorRepository } from '../domain/ProcessorRepository'

export class ProcessorGetter {
  constructor (readonly repository: ProcessorRepository) {}
  async getById ({ id }: { id: Primitives<ProcessorId> }): Promise<ProcessorPrimitives | null> {
    return await this.repository.getById({ id: new ProcessorId(id) }) ?? null
  }
}
