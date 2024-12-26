import { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useLocationInitialState } from "@/sections/Hooks/locations/useLocationInitialState"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"
import { useErrorLocationManagement } from "./useErrorLocationManagement"
import { type DefaultLocationProps } from "@/sections/Hooks/locations/DefaulLocationtInitialState"

export const initialLocationState: DefaultLocationProps = {
    id: undefined,
    typeOfSiteId: '',
    codeAgency: 1,
    regionId: '',
    stateId: '',
    cityId: '',
    siteId: '',
    siteName: '',
    name: '',
    subnet: '',
    updatedAt: undefined
}

export type Action =
    | { type: 'init', payload: { formData: DefaultLocationProps } }
    | { type: 'reset', payload: { formData: DefaultLocationProps } }
    | { type: 'typeOfSiteId', payload: { value: string } }
    | { type: 'regionId', payload: { value: string } }
    | { type: 'stateId', payload: { value: string } }
    | { type: 'cityId', payload: { value: string } }
    | { type: 'siteId', payload: { value: string, siteName: string } }
    | { type: 'name', payload: { value: string } }
    | { type: 'subnet', payload: { value: string } }
    | { type: 'codeAgency', payload: { value: string } }

const reducer = (state: DefaultLocationProps, action: Action): DefaultLocationProps => {
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
    if (action.type === 'typeOfSiteId') {
        return {
            ...state,
            typeOfSiteId: action.payload.value,
            codeAgency: 1,
            name: '',
            subnet: ''
        }
    }
    if (action.type === 'regionId') {
        return {
            ...state,
            regionId: action.payload.value,
            stateId: '',
            cityId: '',
            siteId: '',
            siteName: '',
        }
    }
    if (action.type === 'stateId') {
        return {
            ...state,
            stateId: action.payload.value,
            cityId: '',
            siteId: '',
            siteName: '',
        }
    }
    if (action.type === 'cityId') {
        return {
            ...state,
            cityId: action.payload.value,
            siteId: '',
            siteName: '',
        }
    }
    if (action.type === 'siteId') {
        return {
            ...state,
            siteId: action.payload.value,
            siteName: action.payload.siteName
        }
    }
    if (action.type === 'name') {
        return {
            ...state,
            name: action.payload.value
        }
    }
    if (action.type === 'codeAgency') {
        const numero = Number(action.payload.value)
        let numberFormatter: string = ''
        if (numero >= 1 && numero <= 99) {
            numberFormatter = numero.toString().padStart(3, '0')
        } else {
            numberFormatter = numero.toString()
        }
        return {
            ...state,
            name: `Agencia (${numberFormatter}) ${state.siteName}`,
            codeAgency: Number(numero)
        }
    }
    if (action.type === 'subnet') {
        return {
            ...state,
            subnet: action.payload.value
        }
    }
}



export function useFormLocation(defaultInitialState?: DefaultLocationProps) {
    const { useSiteLocation: { createLocation } } = useAppContext()
    const { isAddForm, preloadedLocationState, setResetState } = useLocationInitialState(defaultInitialState ?? initialLocationState)
    const [prevFormData, setPrevFormData] = useState(preloadedLocationState)
    const [formData, dispatch] = useReducer(reducer, initialLocationState)
    const { disabled, error, required } = useErrorLocationManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createLocation })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedLocationState) } })
        setPrevFormData(structuredClone(preloadedLocationState))
    }, [preloadedLocationState])

    const resetForm = () => {
        dispatch({ type: 'reset', payload: { formData: structuredClone(prevFormData) } })
    }

    const handleChange = (name: Action['type'], value: string) => {
        if (name === 'init' || name === 'reset' || name === 'siteId') return
        dispatch({ type: name, payload: { value } })
    }

    const handleSite = (value: string, siteName: string) => {
        dispatch({ type: 'siteId', payload: { value, siteName } })
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
        handleClose,
        handleSite
    }
}