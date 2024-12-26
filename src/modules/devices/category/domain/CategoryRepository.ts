import { type CategoryPrimitives } from './Category'

export abstract class CategoryRepository {
  abstract getAll (): Promise<CategoryPrimitives[]>
}
