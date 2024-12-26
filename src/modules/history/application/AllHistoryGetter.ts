import { type HistoryPrimitives } from '../domain/history'
import { HistoryRepository } from '../domain/HistoryRepository'
export class AllHistoryGetter {
  constructor(private readonly repository: HistoryRepository) { }

  async get(): Promise<HistoryPrimitives[]> {
    return await this.repository.getAll()
  }
}
