import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type CoordinacionPrimitives } from '../domain/Coordinacion'
import { type CoordinacionRepository } from '../domain/CoordinacionRepository'

export class ApiCoordinacionRepository implements CoordinacionRepository {
  private readonly url: string = 'coordinaciones'
  async getAll(): Promise<CoordinacionPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
