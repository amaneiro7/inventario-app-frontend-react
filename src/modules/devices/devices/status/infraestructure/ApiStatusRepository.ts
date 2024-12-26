import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type StatusPrimitives } from '../domain/Status'
import { type StatusRepository } from '../domain/StatusRepository'

export class ApiStatusRepository implements StatusRepository {
  private readonly url: string = 'status'
  async getAll(): Promise<StatusPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
