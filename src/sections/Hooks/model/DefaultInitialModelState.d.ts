
import { type BrandId } from "@/modules/devices/brand/domain/BrandId"
import { type CategoryId } from "@/modules/devices/category/domain/CategoryId"
import { type MemoryRamTypeId } from "@/modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId"
import { type InputTypeId } from "@/modules/devices/model/InputType/domain/InputTypeId"
import { type ModelId } from "@/modules/devices/model/model/domain/ModelId"
import { type ModelName } from "@/modules/devices/model/model/domain/ModelName"
import { type MemoryRamSlotQuantity } from "@/modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity"
import { type HasFingerPrintReader } from "@/modules/devices/model/ModelCharacteristics/modelKeyboard/HasFingerPrintReader"
import { type BatteryModel } from "@/modules/devices/model/ModelCharacteristics/modelLaptop/BatteryModel"
import { type ScreenSize } from "@/modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize"
import { type CartridgeModel } from "@/modules/devices/model/ModelCharacteristics/modelPrinter/CartridgeModel"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

export interface DefaultModelProps {
    id?: Primitives<ModelId>
    name: Primitives<ModelName>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    generic: boolean
    memoryRamTypeId?: Primitives<MemoryRamTypeId>
    memoryRamSlotQuantity?: Primitives<MemoryRamSlotQuantity>
    hasBluetooth?: boolean
    hasWifiAdapter?: boolean
    hasDVI?: boolean
    hasHDMI?: boolean
    hasVGA?: boolean
    batteryModel?: Primitives<BatteryModel>
    screenSize?: Primitives<ScreenSize>
    cartridgeModel?: Primitives<CartridgeModel>
    inputTypeId?: Primitives<InputTypeId>
    hasFingerPrintReader?: Primitives<HasFingerPrintReader>
    updatedAt?: string
}

export interface FormModelErrors {
    name: string
    categoryId: string
    brandId: string
    memoryRamTypeId: string
    memoryRamSlotQuantity: string
    batteryModel: string
    screenSize: string
    cartridgeModel: string
    inputTypeId: string
}

export interface FormModelDisabled {
    name: boolean
    categoryId: boolean
    brandId: boolean
    generic: boolean
    memoryRamTypeId: boolean
    memoryRamSlotQuantity: boolean
    hasBluetooth: boolean
    hasWifiAdapter: boolean
    hasDVI: boolean
    hasHDMI: boolean
    hasVGA: boolean
    batteryModel: boolean
    screenSize: boolean
    cartridgeModel: boolean
    inputTypeId: boolean
    hasFingerPrintReader: boolean
}
export interface FormModelRequired {
    name: boolean
    categoryId: boolean
    brandId: boolean
    generic: boolean
    memoryRamTypeId: boolean
    memoryRamSlotQuantity: boolean
    hasBluetooth: boolean
    hasWifiAdapter: boolean
    hasDVI: boolean
    hasHDMI: boolean
    hasVGA: boolean
    batteryModel: boolean
    screenSize: boolean
    cartridgeModel: boolean
    inputTypeId: boolean
    hasFingerPrintReader: boolean
}