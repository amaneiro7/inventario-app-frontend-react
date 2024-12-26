import { useEffect, useRef, useState } from "react"
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from "./DefaultInitialModelState"
import { ModelName } from "@/modules/devices/model/model/domain/ModelName"
import { CartridgeModel } from "@/modules/devices/model/ModelCharacteristics/modelPrinter/CartridgeModel"
import { BatteryModel } from "@/modules/devices/model/ModelCharacteristics/modelLaptop/BatteryModel"
import { MemoryRamSlotQuantity } from "@/modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity"
import { ScreenSize } from "@/modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize"


export function useErrorModelManagement({
    name,
    cartridgeModel,
    batteryModel,
    screenSize,
    categoryId,
    memoryRamSlotQuantity
}: DefaultModelProps) {
    const isFistNameInput = useRef(true)
    const isFirstBatteryModelInput = useRef(true)
    const isFirstCartridgeModel = useRef(true)

    const [error, setError] = useState<FormModelErrors>({
        name: '',
        categoryId: '',
        brandId: '',
        memoryRamSlotQuantity: '',
        memoryRamTypeId: '',
        batteryModel: '',
        screenSize: '',
        cartridgeModel: '',
        inputTypeId: '',
    })
    const [disabled, setDisabled] = useState<FormModelDisabled>({
        name: false,
        categoryId: false,
        brandId: false,
        generic: false,
        memoryRamTypeId: false,
        memoryRamSlotQuantity: false,
        hasBluetooth: false,
        hasWifiAdapter: false,
        hasDVI: false,
        hasHDMI: false,
        hasVGA: false,
        batteryModel: false,
        screenSize: false,
        cartridgeModel: false,
        inputTypeId: false,
        hasFingerPrintReader: false
    })

    const [required, setRequired] = useState<FormModelRequired>({
        name: true,
        categoryId: true,
        brandId: true,
        generic: true,
        memoryRamTypeId: true,
        memoryRamSlotQuantity: true,
        hasBluetooth: false,
        hasWifiAdapter: false,
        hasDVI: false,
        hasHDMI: false,
        hasVGA: false,
        batteryModel: true,
        screenSize: true,
        cartridgeModel: true,
        inputTypeId: true,
        hasFingerPrintReader: false
    })

    useEffect(() => {
        if (isFistNameInput.current || name === '') {
            isFistNameInput.current = name?.length < ModelName.NAME_MIN_LENGTH
        }
        if (isFirstBatteryModelInput.current || batteryModel === '') {
            isFirstBatteryModelInput.current = batteryModel?.length < BatteryModel.NAME_MIN_LENGTH
        }
        if (isFirstCartridgeModel.current || cartridgeModel === '') {
            isFirstCartridgeModel.current = cartridgeModel?.length < CartridgeModel.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            name: isFistNameInput.current ? '' : ModelName.isValid(name) ? '' : ModelName.invalidMessage(name),
            batteryModel: isFirstBatteryModelInput.current ? '' : BatteryModel.isValid(batteryModel) ? '' : BatteryModel.invalidMessage(batteryModel),
            cartridgeModel: isFirstCartridgeModel.current ? '' : CartridgeModel.isValid(cartridgeModel) ? '' : CartridgeModel.invalidMessage(cartridgeModel),
            memoryRamSlotQuantity: MemoryRamSlotQuantity.isValid(memoryRamSlotQuantity) ? '' : MemoryRamSlotQuantity.invalidMessage(),
            screenSize: ScreenSize.isValid(screenSize) ? '' : ScreenSize.invalidMessage()
        }))
        setDisabled(prev => ({
            ...prev,
            brandId: !categoryId
        }))
        setRequired(prev => ({
            ...prev,
        }))
    }, [batteryModel, cartridgeModel, categoryId, memoryRamSlotQuantity, name, screenSize])

    return {
        error,
        required,
        disabled
    }
}