import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type MainCategoryPrimitives } from '../domain/MainCategory'
import { type MainCategoryRepository } from '../domain/MainCategoryRepository'

export class ApiMainCategoryRepository implements MainCategoryRepository {
  private readonly url: string = 'maincategories'
  async getAll(): Promise<MainCategoryPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
