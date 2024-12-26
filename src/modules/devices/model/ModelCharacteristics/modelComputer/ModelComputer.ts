import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { BrandId } from "@/modules/devices/brand/domain/BrandId"
import { CategoryId } from "@/modules/devices/category/domain/CategoryId"
import { CategoryDefaultData, CategoryValues } from "@/modules/devices/category/domain/CategoryDefaultData"
import { MemoryRamTypeId } from "@/modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId"
import { Model, type ModelPrimitives } from "../../model/domain/Model"
import { ModelName } from "../../model/domain/ModelName"
import { MemoryRamSlotQuantity } from "./MemoryRamSlotQuantity"

export interface ModelComputerPrimitives extends ModelPrimitives {
  memoryRamTypeId: Primitives<MemoryRamTypeId>
  memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
  hasBluetooth: boolean
  hasWifiAdapter: boolean
  hasDVI: boolean
  hasHDMI: boolean
  hasVGA: boolean
}
export class ModelComputer extends Model {
  constructor(
    name: ModelName,
    categoryId: CategoryId,
    brandId: BrandId,
    generic: boolean,
    private readonly memoryRamTypeId: MemoryRamTypeId,
    private readonly memoryRamSlotQuantity: MemoryRamSlotQuantity,
    private readonly hasBluetooth: boolean,
    private readonly hasWifiAdapter: boolean,
    private readonly hasDVI: boolean,
    private readonly hasHDMI: boolean,
    private readonly hasVGA: boolean
  ) {
    super(name, categoryId, brandId, generic)
  }

  static isComputerCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Servidores']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ModelComputerPrimitives) {
    if (!ModelComputer.isComputerCategory({ categoryId: params.categoryId })) {
      throw new Error('No Pertenece a esta categoria, solo se permite Computadoras, All in One o Servidores')
    }
    return new ModelComputer(
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
      params.hasVGA
    )
  }

  memoryRamTypeValue(): Primitives<MemoryRamTypeId> {
    return this.memoryRamTypeId.value
  }
  memoryRamSlotQuantityValue(): Primitives<MemoryRamSlotQuantity> {
    return this.memoryRamSlotQuantity.value
  }
  hasBluetoothValue(): boolean {
    return this.hasBluetooth
  }
  hasWifiAdapterValue(): boolean {
    return this.hasWifiAdapter
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

  toPrimitives(): ModelComputerPrimitives {
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
      hasVGA: this.hasVGAValue()
    }
  }
}