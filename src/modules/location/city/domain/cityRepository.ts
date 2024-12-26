import { type CityPrimitives } from './city'

export abstract class CityRepository {
  abstract getAll (): Promise<CityPrimitives[]>
}
