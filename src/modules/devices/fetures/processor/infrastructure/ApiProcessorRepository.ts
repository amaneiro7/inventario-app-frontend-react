import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ProcessorPrimitives, type Processor } from '../domain/Processor'
import { type ProcessorId } from '../domain/ProcessorId'
import { type ProcessorRepository } from '../domain/ProcessorRepository'

export class ApiProcessorRepository implements ProcessorRepository {
  private readonly url: string = 'processors'
  async save({ processor }: { processor: Processor }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: processor.toPrimitives() })

  }

  async update({ id, processor }: { id: ProcessorId, processor: Processor }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: processor.toPrimitives() })
  }

  async getAll(): Promise<ProcessorPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }

  async getById({ id }: { id: ProcessorId }): Promise<ProcessorPrimitives | null> {
    return await makeRequest({ method: 'GET', url: `${this.url}/${id.value}` })
  }
}
