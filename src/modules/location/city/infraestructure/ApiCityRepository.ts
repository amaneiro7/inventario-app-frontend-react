import { type CityPrimitives } from '../domain/city'
import { type CityRepository } from '../domain/cityRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiCityRepository implements CityRepository {
  private readonly url: string = 'cities'
  async getAll(): Promise<CityPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
