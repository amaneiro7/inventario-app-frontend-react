import { type BrandPrimitives } from '../domain/Brand'
import { BrandRepository } from '../domain/BrandRepository'

export class AllBrandGetter {
  constructor (private readonly repository: BrandRepository) {}
  async get (): Promise<BrandPrimitives[]> {
    return await this.repository.getAll()
  }
}
