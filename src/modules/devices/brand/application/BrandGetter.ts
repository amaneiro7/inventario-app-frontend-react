import { type BrandPrimitives } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'
import { BrandRepository } from '../domain/BrandRepository'

export class BrandGetter {
  constructor (readonly repository: BrandRepository) {}
  async getById ({ id }: { id: string }): Promise<BrandPrimitives | null> {
    return await this.repository.getById({ id: new BrandId(id) }) ?? null
  }
}
