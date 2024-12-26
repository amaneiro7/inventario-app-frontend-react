import { type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorRepository } from '../domain/ProcessorRepository'

export class AllProcessorGetter {
  constructor (private readonly repository: ProcessorRepository) {}
  async get (): Promise<ProcessorPrimitives[]> {
    return await this.repository.getAll()
  }
}
