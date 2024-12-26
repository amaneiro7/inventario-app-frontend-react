import { type Primitives } from "../../../../shared/domain/value-object/Primitives";
import { BrandId } from "../../../brand/domain/BrandId";
import { CategoryDefaultData, CategoryValues } from "../../../category/domain/CategoryDefaultData";
import { CategoryId } from "../../../category/domain/CategoryId";
import { MemoryRamTypeId } from "../../../fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId";
import { ModelName } from "../../model/domain/ModelName";
import { MemoryRamSlotQuantity } from "../modelComputer/MemoryRamSlotQuantity";
import { ModelComputer, type ModelComputerPrimitives } from "../modelComputer/ModelComputer";
import { BatteryModel } from "./BatteryModel";

export interface ModelLaptopPrimitives extends ModelComputerPrimitives {
  batteryModel: Primitives<BatteryModel>
}

export class ModelLaptop extends ModelComputer {
  constructor(
    name: ModelName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: boolean,
    memoryRamTypeId: MemoryRamTypeId,
    memoryRamSlotQuantity: MemoryRamSlotQuantity,
    hasBluetooth: boolean,
    hasWifiAdapter: boolean,
    hasDVI: boolean,
    hasHDMI: boolean,
    hasVGA: boolean,
    private readonly batterryModel: BatteryModel
  ) {
    super(name, categoryId, brandId, generic, memoryRamTypeId, memoryRamSlotQuantity, hasBluetooth, hasWifiAdapter, hasDVI, hasHDMI, hasVGA)
  }

  static isLaptopCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Laptops']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ModelLaptopPrimitives) {
    if (!ModelLaptop.isLaptopCategory({ categoryId: params.categoryId })) {
      throw new Error('No Pertenece a esta categoria, solo se permite la categoria de Laptops')
    }
    return new ModelLaptop(
      new ModelName(params.name),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      params.generic,
      new MemoryRamTypeId(params.memoryRamTypeId),
      new MemoryRamSlotQuantity(params.memoryRamSlotQuantity),
      params.hasBluetooth,
      params.hasWifiAdapter,
      params.hasDVI,
      params.hasHDMI,
      params.hasVGA,
      new BatteryModel(params.batteryModel)
    )
  }

  batteryModelValue(): Primitives<BatteryModel> {
    return this.batterryModel.value
  }

  toPrimitives(): ModelLaptopPrimitives {
    return {
      name: this.nameValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      generic: this.genericValue(),
      memoryRamTypeId: this.memoryRamTypeValue(),
      memoryRamSlotQuantity: this.memoryRamSlotQuantityValue(),
      hasBluetooth: this.hasBluetoothValue(),
      hasWifiAdapter: this.hasWifiAdapterValue(),
      hasDVI: this.hasDVIValue(),
      hasHDMI: this.hasHDMIValue(),
      hasVGA: this.hasVGAValue(),
      batteryModel: this.batteryModelValue()
    }
  }
}