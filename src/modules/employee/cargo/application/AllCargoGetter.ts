import { type CargoPrimitives } from '../domain/cargo'
import { CargoRepository } from '../domain/cargoRepository'

export class AllCargoGetter {
  constructor (private readonly repository: CargoRepository) {}

  async get (): Promise<CargoPrimitives[]> {
    return await this.repository.getAll()
  }
}
