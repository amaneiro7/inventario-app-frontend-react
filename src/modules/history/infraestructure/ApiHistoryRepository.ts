import { type HistoryPrimitives } from '../domain/history'
import { type HistoryRepository } from '../domain/HistoryRepository'
import { makeRequest } from '../../shared/infraestructure/fetching'

export class ApiHistoryRepository implements HistoryRepository {
  private readonly url: string = 'histories'
  async getAll(): Promise<HistoryPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
