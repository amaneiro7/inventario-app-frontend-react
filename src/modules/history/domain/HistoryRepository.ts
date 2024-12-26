import { type HistoryPrimitives } from './history'

export abstract class HistoryRepository {
  abstract getAll(): Promise<HistoryPrimitives[]>
}
