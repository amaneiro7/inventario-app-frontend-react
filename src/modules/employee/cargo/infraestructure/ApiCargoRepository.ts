import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type CargoPrimitives } from '../domain/cargo'
import { type CargoRepository } from '../domain/cargoRepository'

export class ApiCargoRepository implements CargoRepository {
  private readonly url: string = 'cargos'
  async getAll(): Promise<CargoPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
