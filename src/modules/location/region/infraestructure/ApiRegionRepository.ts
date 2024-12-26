import { type RegionPrimitives } from '../domain/region'
import { type RegionRepository } from '../domain/regionRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiRegionRepository implements RegionRepository {
  private readonly url: string = 'regions'
  async getAll(): Promise<RegionPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
