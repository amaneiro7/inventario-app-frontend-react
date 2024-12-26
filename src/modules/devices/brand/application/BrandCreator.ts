import { Brand, type BrandPrimitives } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'
import { BrandRepository } from '../domain/BrandRepository'

export class BrandCreator {
  constructor (readonly repository: BrandRepository) {}

  async create ({ id, name }: BrandPrimitives): Promise<void> {
    const brand = Brand.create({ name })

    if (id === undefined) {
      return await this.repository.save({ brand })
    } else {
      const brandId = new BrandId(id)
      return await this.repository.update({ id: brandId, brand })
    }
  }
}
