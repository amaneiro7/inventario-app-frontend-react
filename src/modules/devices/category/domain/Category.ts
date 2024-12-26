import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type MainCategoryId } from '../../mainCategory/domain/MainCategoryId'
import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export interface CategoryPrimitives {
  id: Primitives<CategoryId>
  name: Primitives<CategoryName>
  mainCategoryId: Primitives<MainCategoryId>
}

export class Category {
  constructor(
    private readonly id: CategoryId,
    private readonly name: CategoryName,
    private readonly mainCategoryId: CategoryName

  ) { }

  idValue(): Primitives<CategoryId> {
    return this.id.value
  }

  nameValue(): Primitives<CategoryName> {
    return this.name.value
  }
  mainCategoryValue(): Primitives<MainCategoryId> {
    return this.mainCategoryId.value
  }

  toPrimitives(): CategoryPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue(),
      mainCategoryId: this.mainCategoryValue(),
    }
  }
}
