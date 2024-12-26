import { type MainCategoryPrimitives } from './MainCategory'

export abstract class MainCategoryRepository {
  abstract getAll(): Promise<MainCategoryPrimitives[]>
}
