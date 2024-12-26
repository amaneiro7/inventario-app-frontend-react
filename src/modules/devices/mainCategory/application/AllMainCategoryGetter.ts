import { type MainCategoryPrimitives } from '../domain/MainCategory'
import { MainCategoryRepository } from '../domain/MainCategoryRepository'

export class AllMainCategoryGetter {
  constructor(readonly repository: MainCategoryRepository) { }

  async get(): Promise<MainCategoryPrimitives[]> {
    return await this.repository.getAll()
  }
}
