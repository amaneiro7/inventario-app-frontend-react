import { LocationPrimitives } from "../domain/location"
import { LocationId } from "../domain/locationId"
import { LocationRepository } from "../domain/locationRepository"

export class LocationGetter {
  constructor (private readonly repository: LocationRepository) {}

  async getById (id: string): Promise<LocationPrimitives> {
    const locationId = new LocationId(id)
    return await this.repository.getById({ id: locationId })
  }
}
