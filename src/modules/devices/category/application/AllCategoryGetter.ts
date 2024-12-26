import { type CategoryPrimitives } from '../domain/Category'
import { CategoryRepository } from '../domain/CategoryRepository'

export class AllCategoryGetter {
  constructor (readonly repository: CategoryRepository) {}

  async get (): Promise<CategoryPrimitives[]> {
    return await this.repository.getAll()
  }
}
