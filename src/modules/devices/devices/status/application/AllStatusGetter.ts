import { type StatusPrimitives } from '../domain/Status'
import { StatusRepository } from '../domain/StatusRepository'

export class AllStatusGetter {
  constructor (private readonly repository: StatusRepository) {}

  async get (): Promise<StatusPrimitives[]> {
    return await this.repository.getAll()
  }
}
