import { type LocationPrimitives } from '../domain/location'
import { LocationRepository } from '../domain/locationRepository'

export class AllLocationGetter {
  constructor (private readonly repository: LocationRepository) {}

  async get (): Promise<LocationPrimitives[]> {
    return await this.repository.getAll()
  }
}
