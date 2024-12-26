import { useEffect, useState } from "react"
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired, type DefaultProps } from "@/sections/Hooks/device/DefaultInitialState"
import { StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { DeviceSerial } from "@/modules/devices/devices/devices/domain/DeviceSerial"
import { DeviceActivo } from "@/modules/devices/devices/devices/domain/DeviceActivo"
import { DeviceLocation } from "@/modules/devices/devices/devices/domain/DeviceLocation"
import { DeviceStockNumber } from "@/modules/devices/devices/devices/domain/DeviceStockNumber"
import { DeviceEmployee } from "@/modules/devices/devices/devices/domain/DeviceEmployee"
import { ComputerName } from "@/modules/devices/fetures/computer/domain/ComputerName"
import { IPAddress } from "@/modules/devices/fetures/computer/domain/IPAddress"
import { MACAddress } from "@/modules/devices/fetures/computer/domain/MACAddress"
import { MemoryRam } from "@/modules/devices/fetures/computer/domain/MemoryRam"
import { ComputerProcessor } from "@/modules/devices/fetures/computer/domain/ComputerProcessor"
import { ComputerHDDCapacity } from "@/modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { ComputerHDDType } from "@/modules/devices/fetures/computer/domain/ComputerHDDtype"
import { ComputerOs } from "@/modules/devices/fetures/computer/domain/ComputerOS"
import { ComputerOsArq } from "@/modules/devices/fetures/computer/domain/ComputerOSArq"
import { HardDriveHealth } from "@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth"

export function useErrorManagement({
    statusId,
    categoryId,
    mainCategoryId,
    genericModel,
    activo,
    employeeId,
    locationId,
    typeOfSiteId,
    brandId,
    serial,
    stockNumber,
    computerName,
    processorId,
    memoryRam,
    memoryRamCapacity,
    hardDriveCapacityId,
    hardDriveTypeId,
    operatingSystemArqId,
    operatingSystemId,
    ipAddress,
    macAddress,
    health
}: DefaultProps) {
    const [error, setError] = useState<FormDeviceErrors>({
        statusId: '',
        mainCategoryId: '',
        categoryId: '',
        brandId: '',
        modelId: '',
        serial: '',
        activo: '',
        employeeId: '',
        locationId: '',
        stockNumber: '',
        observation: '',
        computerName: '',
        processorId: '',
        memoryRamCapacity: '',
        memoryRam: '',
        hardDriveCapacityId: '',
        hardDriveTypeId: '',
        operatingSystemArqId: '',
        operatingSystemId: '',
        ipAddress: '',
        macAddress: '',
        health: '',
    })
    const [required, setRequired] = useState<FormDeviceRequired>({
        statusId: true,
        mainCategoryId: true,
        categoryId: true,
        brandId: true,
        modelId: true,
        serial: true,
        activo: false,
        employeeId: false,
        locationId: false,
        stockNumber: false,
        observation: false,
        computerName: false,
        processorId: false,
        memoryRamCapacity: false,
        memoryRam: false,
        hardDriveCapacityId: false,
        hardDriveTypeId: false,
        operatingSystemArqId: false,
        operatingSystemId: false,
        ipAddress: false,
        macAddress: false,
        health: true,
    })
    const [disabled, setDisabled] = useState<FormDeviceDisabled>({
        statusId: false,
        mainCategoryId: false,
        categoryId: false,
        brandId: true,
        modelId: true,
        serial: false,
        activo: false,
        employeeId: true,
        locationId: true,
        stockNumber: true,
        observation: false,
        computerName: true,
        processorId: false,
        memoryRamCapacity: false,
        memoryRam: false,
        hardDriveCapacityId: false,
        hardDriveTypeId: false,
        operatingSystemArqId: false,
        operatingSystemId: false,
        ipAddress: false,
        macAddress: false,
        health: false,
    })

    useEffect(() => {
        setError(prev => ({
            ...prev,
            serial: DeviceSerial.isValid(serial) ? '' : DeviceSerial.invalidMessage(),
            activo: DeviceActivo.isValid(activo) ? '' : DeviceActivo.invalidMessage(),
            locationId: DeviceLocation.isValid({ typeOfSite: typeOfSiteId, status: statusId }) ? '' : DeviceLocation.invalidMessage(),
            employeeId: DeviceEmployee.isValid(employeeId, statusId) ? '' : DeviceEmployee.invalidMessage(),
            stockNumber: DeviceStockNumber.isValid(stockNumber, statusId) ? '' : DeviceStockNumber.invalidMessage(),
            computerName: ComputerName.isValid(computerName, statusId) ? '' : ComputerName.invalidMessage(),
            ipAddress: IPAddress.isValid(ipAddress, statusId) ? '' : IPAddress.invalidMessage(),
            memoryRamCapacity: MemoryRam.isValid(memoryRam, statusId) ? '' : MemoryRam.invalidMessage(),
            processorId: ComputerProcessor.isValid(processorId, statusId) ? '' : ComputerProcessor.invalidMessage(),
            hardDriveCapacityId: ComputerHDDCapacity.isValid(hardDriveCapacityId, statusId) ? '' : ComputerHDDCapacity.invalidMessage(),
            hardDriveTypeId: ComputerHDDType.isValid(hardDriveTypeId, hardDriveCapacityId) ? '' : ComputerHDDType.invalidMessage(),
            operatingSystemId: ComputerOs.isValid(operatingSystemId, statusId, hardDriveCapacityId) ? '' : ComputerOs.invalidMessage(),
            operatingSystemArqId: ComputerOsArq.isValid(operatingSystemArqId, operatingSystemId) ? '' : ComputerOsArq.invalidMessage(),
            macAddress: MACAddress.isValid(macAddress) ? '' : MACAddress.invalidMessage(macAddress),
            health: HardDriveHealth.isValid(health) ? '' : HardDriveHealth.invalidMessage()
        }))

        setDisabled(prev => ({
            ...prev,
            categoryId: !mainCategoryId,
            brandId: !categoryId,
            modelId: !brandId,
            locationId: !statusId || [StatusId.StatusOptions.DESINCORPORADO].includes(statusId),
            stockNumber: !statusId || ![StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR].includes(statusId),
            employeeId: !statusId || [StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR, StatusId.StatusOptions.DESINCORPORADO, StatusId.StatusOptions.DISPONIBLE].includes(statusId),
            computerName: [StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR, StatusId.StatusOptions.DESINCORPORADO].includes(statusId),
            ipAddress: [StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR, StatusId.StatusOptions.DESINCORPORADO].includes(statusId),
            hardDriveTypeId: !hardDriveCapacityId,
            operatingSystemId: [StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR, StatusId.StatusOptions.DESINCORPORADO].includes(statusId) || !hardDriveCapacityId,
            operatingSystemArqId: !operatingSystemId
        }))

        setRequired(prev => ({
            ...prev,
            serial: !genericModel,
            employeeId: [StatusId.StatusOptions.PRESTAMO, StatusId.StatusOptions.CONTINGENCIA, StatusId.StatusOptions.GUARDIA].includes(statusId),
            locationId: ![StatusId.StatusOptions.DESINCORPORADO].includes(statusId),
            computerName: ![StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PORDESINCORPORAR, StatusId.StatusOptions.DESINCORPORADO].includes(statusId),
            ipAddress: [StatusId.StatusOptions.INUSE].includes(statusId),
            memoryRamCapacity: [StatusId.StatusOptions.INUSE, StatusId.StatusOptions.PRESTAMO, StatusId.StatusOptions.CONTINGENCIA, StatusId.StatusOptions.GUARDIA].includes(statusId),
            processorId: [StatusId.StatusOptions.INUSE, StatusId.StatusOptions.INALMACEN, StatusId.StatusOptions.PRESTAMO, StatusId.StatusOptions.GUARDIA, StatusId.StatusOptions.CONTINGENCIA].includes(statusId),
            hardDriveCapacityId: [StatusId.StatusOptions.INUSE, StatusId.StatusOptions.PRESTAMO, StatusId.StatusOptions.CONTINGENCIA, StatusId.StatusOptions.GUARDIA].includes(statusId),
            hardDriveTypeId: !!hardDriveCapacityId,
            operatingSystemId: [StatusId.StatusOptions.INUSE, StatusId.StatusOptions.PRESTAMO, StatusId.StatusOptions.CONTINGENCIA, StatusId.StatusOptions.GUARDIA].includes(statusId),
            operatingSystemArqId: !!operatingSystemId
        }))
    }, [memoryRamCapacity, activo, employeeId, locationId, serial, statusId, typeOfSiteId, stockNumber, categoryId, brandId, computerName, ipAddress, macAddress, memoryRam, processorId, hardDriveCapacityId, hardDriveTypeId, operatingSystemId, operatingSystemArqId, health, genericModel, mainCategoryId])

    return {
        error,
        required,
        disabled
    }
}