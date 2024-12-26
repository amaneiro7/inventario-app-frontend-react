import { type RegionPrimitives } from '../domain/region'
import { RegionRepository } from '../domain/regionRepository'

export class AllRegionGetter {
  constructor (private readonly repository: RegionRepository) {}

  async get (): Promise<RegionPrimitives[]> {
    return await this.repository.getAll()
  }
}
