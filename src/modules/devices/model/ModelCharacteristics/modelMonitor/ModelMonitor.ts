import { type Primitives } from "../../../../shared/domain/value-object/Primitives"
import { Model, type ModelPrimitives } from "../../model/domain/Model"
import { BrandId } from "../../../brand/domain/BrandId"
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData"
import { CategoryId } from "../../../category/domain/CategoryId"
import { ModelName } from "../../model/domain/ModelName"
import { ScreenSize } from "./ScreenSize"


export interface ModelMonitorPrimitives extends ModelPrimitives {
  screenSize: Primitives<ScreenSize>
  hasDVI: boolean
  hasHDMI: boolean
  hasVGA: boolean
}
export class ModelMonitor extends Model {
  constructor(
    name: ModelName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: boolean,
    private readonly screenSize: ScreenSize,
    private readonly hasDVI: boolean,
    private readonly hasHDMI: boolean,
    private readonly hasVGA: boolean
  ) {
    super(name, categoryId, brandId, generic)
  }

  static isMonitorCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedCategories: CategoryValues[] = ['Monitores']
    return AcceptedCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ModelMonitorPrimitives) {
    if (!ModelMonitor.isMonitorCategory({ categoryId: params.categoryId })) {
      throw new Error('No Pertenece a esta categoria, solo se permite Monitores')
    }
    return new ModelMonitor(
      new ModelName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      params.generic,
      new ScreenSize(params.screenSize),
      params.hasDVI,
      params.hasHDMI,
      params.hasVGA
    )
  }

  screenSizeValue(): Primitives<ScreenSize> {
    return this.screenSize.value
  }

  hasDVIValue(): boolean {
    return this.hasDVI
  }
  hasHDMIValue(): boolean {
    return this.hasHDMI
  }
  hasVGAValue(): boolean {
    return this.hasVGA
  }

  toPrimitives(): ModelMonitorPrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      generic: this.genericValue(),
      screenSize: this.screenSizeValue(),
      hasDVI: this.hasDVIValue(),
      hasHDMI: this.hasHDMIValue(),
      hasVGA: this.hasVGAValue()
    }
  }
}