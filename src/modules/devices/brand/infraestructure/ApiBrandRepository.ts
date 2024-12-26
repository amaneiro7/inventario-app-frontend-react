import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type BrandPrimitives, type Brand } from '../domain/Brand'
import { type BrandId } from '../domain/BrandId'
import { type BrandRepository } from '../domain/BrandRepository'

export class ApiBrandRepository implements BrandRepository {
  private readonly url: string = 'brands'
  async save({ brand }: { brand: Brand }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: brand.toPrimitives() })
  }

  async update({ id, brand }: { id: BrandId, brand: Brand }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: brand.toPrimitives() })
  }

  async getAll(): Promise<BrandPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }

  async getById({ id }: { id: BrandId }): Promise<BrandPrimitives | null> {
    return await makeRequest({ method: 'GET', url: `${this.url}/${id.value}` })
  }
}
