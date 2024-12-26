import { Location, type LocationPrimitives } from '../domain/location'
import { type LocationRepository } from '../domain/locationRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'
import { Criteria } from '../../../shared/domain/criteria/Criteria'
import { LocationId } from '../domain/locationId'

export class ApiLocationRepository implements LocationRepository {
  private readonly url: string = 'locations'
  async getAll(): Promise<LocationPrimitives[]> {
    return await makeRequest({ method: 'GET', url: `${this.url}/all` })
  }

  async getById({ id }: { id: LocationId }): Promise<LocationPrimitives> {
    return await makeRequest({ method: 'GET', url: `${this.url}/${id.value}` })
  }

  async getByCriteria(criteria: Criteria): Promise<LocationPrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest({ method: 'GET', url: `${this.url}?${queryParams}` })
  }

  async save({ location }: { location: Location }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: location.toPrimitives() })
  }

  async update({ id, location }: { id: LocationId, location: Location }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: location.toPrimitives() })
  }
}
