import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../../brand/domain/BrandId'
import { CategoryId } from '../../../category/domain/CategoryId'
import { type ModelId } from './ModelId'
import { ModelName } from './ModelName'

export interface ModelPrimitives {
  id?: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  generic: boolean
}
export class Model {
  constructor(
    private readonly name: ModelName,
    private readonly categoryId: CategoryId,
    private readonly brandId: BrandId,
    private readonly generic: boolean
  ) { }

  public static create(params: ModelPrimitives): Model {
    return new Model(
      new ModelName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      params.generic,
    )
  }

  nameValue(): Primitives<ModelName> {
    return this.name.value
  }

  categoryValue(): Primitives<CategoryId> {
    return this.categoryId.value
  }

  brandValue(): Primitives<BrandId> {
    return this.brandId.value
  }

  genericValue(): boolean {
    return this.generic
  }

  toPrimitives(): ModelPrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      generic: this.genericValue(),
    }
  }
}
