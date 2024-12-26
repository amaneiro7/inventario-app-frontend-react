import { useLayoutEffect, useReducer, useState } from "react"
import { useDeviceInitialState } from "@/sections/Hooks/device/DeviceFormInitialState"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import { MemoryRam } from "@/modules/devices/fetures/computer/domain/MemoryRam"
import { StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { useErrorManagement } from "./useErrorManagement"
import { type DefaultProps } from "@/sections/Hooks/device/DefaultInitialState"

export const initialState: DefaultProps = {
    id: undefined,
    statusId: '',
    categoryId: '',
    mainCategoryId: '',
    brandId: '',
    modelId: '',
    genericModel: undefined,
    serial: '',
    activo: '',
    employeeId: '',
    locationId: '',
    typeOfSiteId: '',
    stockNumber: '',
    observation: '',
    computerName: '',
    processorId: '',
    memoryRamSlotQuantity: undefined,
    memoryRamType: '',
    memoryRamCapacity: 0,
    memoryRam: [],
    hardDriveCapacityId: '',
    hardDriveTypeId: '',
    operatingSystemArqId: '',
    operatingSystemId: '',
    ipAddress: '',
    macAddress: '',
    health: 100,
    updatedAt: undefined,
    history: []
}


export type Action =
    | { type: 'INIT_STATE', payload: { formData: DefaultProps } }
    | { type: 'reset', payload: { formData: DefaultProps } }
    | { type: 'statusId', payload: { value: string } }
    | { type: 'mainCategoryId', payload: { value: string } }
    | { type: 'categoryId', payload: { value: string } }
    | { type: 'brandId', payload: { value: string } }
    | { type: 'modelId', payload: { value: string, memoryRamSlotQuantity: number, memoryRamType: string, generic?: boolean } }
    | { type: 'serial', payload: { value: string } }
    | { type: 'activo', payload: { value: string } }
    | { type: 'employeeId', payload: { value: string } }
    | { type: 'locationId', payload: { value: string, typeOfSiteId: string, ipAddress?: string } }
    | { type: 'stockNumber', payload: { value: string } }
    | { type: 'observation', payload: { value: string } }
    | { type: 'computerName', payload: { value: string } }
    | { type: 'processorId', payload: { value: string } }
    | { type: 'memoryRam', payload: { value: string, index: number } }
    | { type: 'hardDriveCapacityId', payload: { value: string } }
    | { type: 'hardDriveTypeId', payload: { value: string } }
    | { type: 'operatingSystemArqId', payload: { value: string } }
    | { type: 'operatingSystemId', payload: { value: string } }
    | { type: 'ipAddress', payload: { value: string } }
    | { type: 'macAddress', payload: { value: string } }
    | { type: 'health', payload: { value: number } }

const reducer = (state: DefaultProps, action: Action): DefaultProps => {
    if (action.type === 'INIT_STATE') {
        const { formData } = action.payload
        return {
            ...state,
            ...formData
        }
    }
    if (action.type === 'reset') {
        const { formData } = action.payload
        return {
            ...state,
            ...formData
        }
    }
    if (action.type === 'statusId') {
        const { value } = action.payload
        if ([
            StatusId.StatusOptions.INALMACEN,
            StatusId.StatusOptions.PORDESINCORPORAR,
            StatusId.StatusOptions.DESINCORPORADO,
        ].includes(value)) {
            return {
                ...state,
                statusId: value,
                employeeId: '',
                locationId: '',
                computerName: '',
                operatingSystemId: '',
                operatingSystemArqId: '',
                ipAddress: '',
            }
        } else if ([StatusId.StatusOptions.DISPONIBLE].includes(value)) {
            return {
                ...state,
                statusId: value,
                employeeId: '',
                stockNumber: ''
            }
        } else {
            return {
                ...state,
                statusId: value,
                stockNumber: ''
            }
        }
    }
    if (action.type === 'categoryId') {
        const { value } = action.payload
        return {
            ...state,
            categoryId: value,
            brandId: '',
            modelId: '',
            computerName: '',
            processorId: '',
            memoryRamSlotQuantity: undefined,
            memoryRamType: '',
            memoryRamCapacity: 0,
            memoryRam: [],
            hardDriveCapacityId: '',
            hardDriveTypeId: '',
            operatingSystemArqId: '',
            operatingSystemId: '',
            ipAddress: '',
            macAddress: '',
            health: 100
        }
    }
    if (action.type === 'mainCategoryId') {
        const { value } = action.payload
        return {
            ...state,
            mainCategoryId: value,
            categoryId: '',
            brandId: '',
            modelId: '',
            computerName: '',
            processorId: '',
            memoryRamSlotQuantity: undefined,
            memoryRamType: '',
            memoryRamCapacity: 0,
            memoryRam: [],
            hardDriveCapacityId: '',
            hardDriveTypeId: '',
            operatingSystemArqId: '',
            operatingSystemId: '',
            ipAddress: '',
            macAddress: '',
            health: 100
        }
    }
    if (action.type === 'brandId') {
        const { value } = action.payload
        return {
            ...state,
            brandId: value,
            modelId: '',
            memoryRamSlotQuantity: undefined,
            memoryRamType: '',
            memoryRamCapacity: 0,
            memoryRam: [],
        }
    }
    if (action.type === 'modelId') {
        const { value, memoryRamSlotQuantity, memoryRamType, generic } = action.payload

        const memoryRam = state.memoryRam?.length === memoryRamSlotQuantity ? state.memoryRam : new Array(memoryRamSlotQuantity).fill(0)

        return {
            ...state,
            modelId: value,
            memoryRamSlotQuantity,
            memoryRamType,
            memoryRam,
            genericModel: generic

        }
    }
    if (action.type === 'serial') {
        const { value } = action.payload
        return {
            ...state,
            serial: value
        }
    }
    if (action.type === 'activo') {
        const { value } = action.payload
        return {
            ...state,
            activo: value
        }
    }
    if (action.type === 'employeeId') {
        const { value } = action.payload
        return {
            ...state,
            employeeId: value
        }
    }
    if (action.type === 'locationId') {
        const { value, typeOfSiteId, ipAddress } = action.payload
        let newIpAddress
        if (ipAddress) {
            // Dividir la direccion IP en segmentos
            const segments = ipAddress.split('.')
            // Eliminar el ultimo segmento
            segments.pop()
            // Unir los segmentos restantes con un punto al final
            newIpAddress = segments.join('.') + '.'
        } else {
            // si el ip Address es undefined o un string vacio, se deja el mismo valor
            newIpAddress = state.ipAddress
        }
        // si ya estaba escrita una IP, se deja la ip que estaba antes sin modificarla
        return {
            ...state,
            locationId: value,
            typeOfSiteId,
            stockNumber: '',
            ipAddress: newIpAddress
        }
    }
    if (action.type === 'stockNumber') {
        const { value } = action.payload
        return {
            ...state,
            stockNumber: value
        }
    }
    if (action.type === 'observation') {
        const { value } = action.payload
        return {
            ...state,
            observation: value
        }
    }
    if (action.type === 'computerName') {
        const { value } = action.payload
        return {
            ...state,
            computerName: value
        }
    }
    if (action.type === 'processorId') {
        const { value } = action.payload
        return {
            ...state,
            processorId: value
        }
    }
    if (action.type === 'memoryRam') {
        const { value, index } = action.payload
        const parsedValue = parseFloat(value)

        const updatedMemoryRamSlot = state.memoryRam
        updatedMemoryRamSlot[index] = isNaN(parsedValue) ? 0 : parsedValue

        return {
            ...state,
            memoryRam: updatedMemoryRamSlot,
            memoryRamCapacity: MemoryRam.totalAmount(updatedMemoryRamSlot)
        }
    }
    if (action.type === 'hardDriveCapacityId') {
        const { value } = action.payload
        const hardDriveTypeId = value ? state.hardDriveTypeId : ''
        const operatingSystemId = value ? state.operatingSystemId : ''
        const operatingSystemArqId = value ? state.operatingSystemArqId : ''
        return {
            ...state,
            hardDriveCapacityId: value,
            hardDriveTypeId,
            operatingSystemId,
            operatingSystemArqId
        }
    }
    if (action.type === 'hardDriveTypeId') {
        const { value } = action.payload
        return {
            ...state,
            hardDriveTypeId: value
        }
    }
    if (action.type === 'operatingSystemId') {
        const { value } = action.payload
        const operatingSystemArqId = value ? state.operatingSystemArqId : ''
        return {
            ...state,
            operatingSystemId: value,
            operatingSystemArqId
        }
    }
    if (action.type === 'operatingSystemArqId') {
        const { value } = action.payload
        return {
            ...state,
            operatingSystemArqId: value,
        }
    }
    if (action.type === 'ipAddress') {
        const { value } = action.payload
        return {
            ...state,
            ipAddress: value,
        }
    }
    if (action.type === 'macAddress') {
        const { value } = action.payload
        return {
            ...state,
            macAddress: value,
        }
    }
    if (action.type === 'health') {
        const { value } = action.payload
        return {
            ...state,
            health: value,
        }
    }
    return state
}

export function useFormDevice() {
    const { createDevice } = useDeviceContext()
    const { isAddForm, preloadedDeviceState, setResetState } = useDeviceInitialState()
    const [prevFormData, setPrevFormData] = useState(preloadedDeviceState)
    const [formData, dispatch] = useReducer(reducer, initialState)
    const { error, disabled, required } = useErrorManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createDevice })

    useLayoutEffect(() => {
        dispatch({ type: 'INIT_STATE', payload: { formData: structuredClone(preloadedDeviceState) } })
        setPrevFormData(structuredClone(preloadedDeviceState))
    }, [preloadedDeviceState])

    const resetForm = () => {
        dispatch({ type: 'reset', payload: { formData: structuredClone(prevFormData) } })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData, setResetState)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (name: Action['type'], value: any) => {
        if (name === 'INIT_STATE' || name === 'reset' || name === 'modelId' || name === 'memoryRam' || name === 'locationId') return
        dispatch({ type: name, payload: { value } })
    }

    const handleModel = ({ value, memoryRamSlotQuantity, memoryRamType, generic }: { value: string, memoryRamSlotQuantity?: number, memoryRamType?: string, generic?: boolean }) => {
        dispatch({ type: 'modelId', payload: { value, memoryRamSlotQuantity, memoryRamType, generic } })
    }
    const handleLocation = ({ value, typeOfSiteId, ipAddress }: { value: string, typeOfSiteId?: string, ipAddress?: string }) => {
        dispatch({ type: 'locationId', payload: { value, typeOfSiteId, ipAddress } })
    }
    const handleMemory = (value: string, index: number) => {
        dispatch({ type: 'memoryRam', payload: { value, index } })
    }

    const handleClose = () => { window.history.back() }

    return {
        formData,
        isAddForm,
        processing,
        error,
        disabled,
        required,
        handleSubmit,
        handleClose,
        handleChange,
        handleMemory,
        handleModel,
        resetForm,
        handleLocation
    }
}