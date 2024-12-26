import { type StatePrimitives } from '../domain/state'
import { StateRepository } from '../domain/stateRepository'
export class AllStateGetter {
  constructor (private readonly repository: StateRepository) {}

  async get (): Promise<StatePrimitives[]> {
    return await this.repository.getAll()
  }
}
