import { type CityPrimitives } from '../domain/city'
import { CityRepository } from '../domain/cityRepository'
export class AllCityGetter {
  constructor (private readonly repository: CityRepository) {}

  async get (): Promise<CityPrimitives[]> {
    return await this.repository.getAll()
  }
}
