import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

export class ApiCategoryRepository implements CategoryRepository {
  private readonly url: string = 'categories'
  async getAll(): Promise<CategoryPrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
