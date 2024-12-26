import { type TypeOfSitePrimitives } from '../domain/typeOfSite'
import { TypeOfSiteRepository } from '../domain/typeOfSiteRepository'
export class AllTypeOfSiteGetter {
  constructor (private readonly repository: TypeOfSiteRepository) {}

  async get (): Promise<TypeOfSitePrimitives[]> {
    return await this.repository.getAll()
  }
}
