import { type CoordinacionPrimitives } from '../domain/Coordinacion'
import { CoordinacionRepository } from '../domain/CoordinacionRepository'

export class AllCoordinacionGetter {
  constructor (private readonly repository: CoordinacionRepository) {}

  async get (): Promise<CoordinacionPrimitives[]> {
    return await this.repository.getAll()
  }
}
