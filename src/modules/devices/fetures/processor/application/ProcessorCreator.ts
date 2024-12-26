import { Processor, type ProcessorPrimitives } from '../domain/Processor'
import { ProcessorId } from '../domain/ProcessorId'
import { ProcessorRepository } from '../domain/ProcessorRepository'

export class ProcessorCreator {
  constructor (readonly repository: ProcessorRepository) {}

  async create ({ id, productCollection, numberModel, cores, threads, frequency }: ProcessorPrimitives): Promise<void> {
    const processor = Processor.create({ productCollection, numberModel, cores, threads, frequency })

    if (id === undefined) {
      return await this.repository.save({ processor })
    } else {
      const processorId = new ProcessorId(id)
      return await this.repository.update({ id: processorId, processor })
    }
  }
}
