import { type TypeOfSitePrimitives } from './typeOfSite'

export abstract class TypeOfSiteRepository {
  abstract getAll (): Promise<TypeOfSitePrimitives[]>
}
