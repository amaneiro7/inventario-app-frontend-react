import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type MainCategoryId } from './MainCategoryId'
import { type MainCategoryName } from './MainCategoryName'

export interface MainCategoryPrimitives {
  id: Primitives<MainCategoryId>
  name: Primitives<MainCategoryName>
}

export class MainCategory {
  constructor(
    private readonly id: MainCategoryId,
    private readonly name: MainCategoryName
  ) { }

  idValue(): Primitives<MainCategoryId> {
    return this.id.value
  }

  nameValue(): Primitives<MainCategoryName> {
    return this.name.value
  }

  toPrimitives(): MainCategoryPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
