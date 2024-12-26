import { Location, LocationPrimitives } from "../domain/location"
import { LocationId } from "../domain/locationId"
import { LocationRepository } from "../domain/locationRepository"

export class LocationCreator {
  constructor (private readonly repository: LocationRepository) {}

  async create (params: LocationPrimitives) {
    const location = Location.create(params)

    if (params.id === undefined) {
      return await this.repository.save({ location })
    } else {
      const locationId = new LocationId(params.id)
      return await this.repository.update({ id: locationId, location })
    }
  }
}
