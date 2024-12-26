import { type Primitives } from "../../../../shared/domain/value-object/Primitives"
import { BrandId } from "../../../brand/domain/BrandId"
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData"
import { CategoryId } from "../../../category/domain/CategoryId"
import { Model, type ModelPrimitives } from "../../model/domain/Model"
import { ModelName } from "../../model/domain/ModelName"
import { CartridgeModel } from "./CartridgeModel"


export interface ModelPrinterPrimitives extends ModelPrimitives {
  cartridgeModel: Primitives<CartridgeModel>
}
export class ModelPrinter extends Model {
  constructor(
    name: ModelName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: boolean,
    private readonly cartridgeModel: CartridgeModel,
  ) {
    super(name, categoryId, brandId, generic)
  }

  static isPrinterCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedCategories: CategoryValues[] = ['Impresoras Laser', 'Impresoras Tinta']
    return AcceptedCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ModelPrinterPrimitives) {
    if (!ModelPrinter.isPrinterCategory({ categoryId: params.categoryId })) {
      throw new Error('No Pertenece a esta categoria, solo se permite Impresoras Laser e Impresoras de Tinta')
    }
    return new ModelPrinter(
      new ModelName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      params.generic,
      new CartridgeModel(params.cartridgeModel)
    )
  }

  cartridgeModelValue(): Primitives<CartridgeModel> {
    return this.cartridgeModel.value
  }

  toPrimitives(): ModelPrinterPrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      generic: this.genericValue(),
      cartridgeModel: this.cartridgeModelValue()
    }
  }
}