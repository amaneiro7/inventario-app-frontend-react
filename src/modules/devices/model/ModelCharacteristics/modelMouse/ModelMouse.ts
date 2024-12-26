import { type Primitives } from "../../../../shared/domain/value-object/Primitives"
import { Model, type ModelPrimitives } from "../../model/domain/Model"
import { BrandId } from "../../../brand/domain/BrandId"
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData"
import { CategoryId } from "../../../category/domain/CategoryId"
import { InputTypeId } from "../../InputType/domain/InputTypeId"
import { ModelName } from "../../model/domain/ModelName"


export interface ModelMousePrimitives extends ModelPrimitives {
  inputTypeId: Primitives<InputTypeId>
}
export class ModelMouse extends Model {
  constructor(
    name: ModelName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: boolean,
    private readonly inputTypeId: InputTypeId,
  ) {
    super(name, categoryId, brandId, generic)
  }

  static isMouseCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedCategories: CategoryValues[] = ['Mouses']
    return AcceptedCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ModelMousePrimitives) {
    if (!ModelMouse.isMouseCategory({ categoryId: params.categoryId })) {
      throw new Error('No Pertenece a esta categoria, solo se permite Impresoras Laser e Impresoras de Tinta')
    }
    return new ModelMouse(
      new ModelName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      params.generic,
      new InputTypeId(params.inputTypeId)
    )
  }

  inputTypeIdValue(): Primitives<InputTypeId> {
    return this.inputTypeId.value
  }


  toPrimitives(): ModelMousePrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      generic: this.genericValue(),
      inputTypeId: this.inputTypeIdValue()
    }
  }
}