import { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useModelInitialState } from "./ModelFormInitialState"
import { useGenericForm2 } from "../useGenericForm2"
import { MemoryRamSlotQuantity } from "@/modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity"
import { ScreenSize } from "@/modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize"
import { type DefaultModelProps } from "./DefaultInitialModelState"
import { useErrorModelManagement } from "./useErrorModelManagement"

export const initialModelState: DefaultModelProps = {
    id: undefined,
    name: '',
    categoryId: '',
    brandId: '',
    generic: false,
    hasBluetooth: false,
    hasDVI: false,
    hasHDMI: false,
    hasVGA: true,
    hasWifiAdapter: false,
    hasFingerPrintReader: false,
    memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
    memoryRamTypeId: '',
    batteryModel: '',
    screenSize: ScreenSize.MIN,
    cartridgeModel: '',
    inputTypeId: '',
    updatedAt: undefined
}

export type Action =
    | { type: 'init', payload: { formData: DefaultModelProps } }
    | { type: 'reset', payload: { formData: DefaultModelProps } }
    | { type: 'name', payload: { value: string } }
    | { type: 'categoryId', payload: { value: string } }
    | { type: 'brandId', payload: { value: string } }
    | { type: 'generic', payload: { value: boolean } }
    | { type: 'hasBluetooth', payload: { value: boolean } }
    | { type: 'hasDVI', payload: { value: boolean } }
    | { type: 'hasHDMI', payload: { value: boolean } }
    | { type: 'hasVGA', payload: { value: boolean } }
    | { type: 'hasWifiAdapter', payload: { value: boolean } }
    | { type: 'hasFingerPrintReader', payload: { value: boolean } }
    | { type: 'memoryRamSlotQuantity', payload: { value: string } }
    | { type: 'memoryRamTypeId', payload: { value: string } }
    | { type: 'batteryModel', payload: { value: string } }
    | { type: 'screenSize', payload: { value: string } }
    | { type: 'cartridgeModel', payload: { value: string } }
    | { type: 'inputTypeId', payload: { value: string } }

const reducer = (state: DefaultModelProps, action: Action): DefaultModelProps => {
    if (action.type === 'init') {
        return {
            ...state,
            ...action.payload.formData
        }
    }
    if (action.type === 'reset') {
        return {
            ...state,
            ...action.payload.formData
        }
    }
    if (action.type === 'name') {
        return {
            ...state,
            name: action.payload.value
        }
    }
    if (action.type === 'categoryId') {
        return {
            ...state,
            categoryId: action.payload.value
        }
    }
    if (action.type === 'brandId') {
        return {
            ...state,
            brandId: action.payload.value
        }
    }
    if (action.type === 'generic') {
        return {
            ...state,
            generic: action.payload.value
        }
    }
    if (action.type === 'hasBluetooth') {
        return {
            ...state,
            hasBluetooth: action.payload.value
        }
    }
    if (action.type === 'hasDVI') {
        return {
            ...state,
            hasDVI: action.payload.value
        }
    }
    if (action.type === 'hasHDMI') {
        return {
            ...state,
            hasHDMI: action.payload.value
        }
    }
    if (action.type === 'hasVGA') {
        return {
            ...state,
            hasVGA: action.payload.value
        }
    }
    if (action.type === 'hasWifiAdapter') {
        return {
            ...state,
            hasWifiAdapter: action.payload.value
        }
    }
    if (action.type === 'hasFingerPrintReader') {
        return {
            ...state,
            hasFingerPrintReader: action.payload.value
        }
    }
    if (action.type === 'memoryRamSlotQuantity') {
        const memoryRamSlotQuantity = Number(action.payload.value)
        return {
            ...state,
            memoryRamSlotQuantity
        }
    }
    if (action.type === 'memoryRamTypeId') {
        return {
            ...state,
            memoryRamTypeId: action.payload.value
        }
    }
    if (action.type === 'batteryModel') {
        return {
            ...state,
            batteryModel: action.payload.value
        }
    }
    if (action.type === 'screenSize') {
        const screenSize = Number(action.payload.value)
        return {
            ...state,
            screenSize
        }
    }
    if (action.type === 'cartridgeModel') {
        return {
            ...state,
            cartridgeModel: action.payload.value
        }
    }
    if (action.type === 'inputTypeId') {
        return {
            ...state,
            inputTypeId: action.payload.value
        }
    }

}

export function useFormModel(defaultInitialState?: DefaultModelProps) {
    const { useModel: { createModel } } = useAppContext()
    const { preloadedModelState, isAddForm, setResetState } = useModelInitialState(defaultInitialState ?? initialModelState)
    const [prevFormData, setPrevFormData] = useState(preloadedModelState)
    const [formData, dispatch] = useReducer(reducer, initialModelState)
    const { disabled, error, required } = useErrorModelManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createModel })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedModelState) } })
        setPrevFormData(structuredClone(preloadedModelState))
    }, [preloadedModelState])

    const resetForm = () => {
        dispatch({ type: 'reset', payload: { formData: structuredClone(prevFormData) } })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (name: Action['type'], value: any) => {
        if (name === 'init' || name === 'reset') return
        dispatch({ type: name, payload: { value } })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData, setResetState)
    }

    const handleClose = () => { window.history.back() }

    return {
        formData,
        isAddForm,
        processing,
        disabled,
        error,
        required,
        handleSubmit,
        resetForm,
        handleChange,
        handleClose
    }
}