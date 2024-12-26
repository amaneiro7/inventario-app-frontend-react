import React, { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useBrandInitialState } from "./BrandFormInitialState"
import { useErrorBrandManagement } from "./useErrorBrandManagement"
import { useGenericForm2 } from "../useGenericForm2"
import { type DefaultBrandProps } from "./DefaultInitialBrandState"

export const initialBrandState: DefaultBrandProps = {
    id: undefined,
    name: '',
}

export type Action =
    | { type: 'init', payload: { formData: DefaultBrandProps } }
    | { type: 'reset', payload: { formData: DefaultBrandProps } }
    | { type: 'name', payload: { value: string } }

const reducer = (state: DefaultBrandProps, action: Action): DefaultBrandProps => {
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

}

export function useFormBrand(defaultInitialState?: DefaultBrandProps) {
    const { useBrand: { createBrand } } = useAppContext()
    const { preloadedBrandState, isAddForm, setResetState } = useBrandInitialState(defaultInitialState ?? initialBrandState)
    const [prevFormData, setPrevFormData] = useState(preloadedBrandState)
    const [formData, dispatch] = useReducer(reducer, initialBrandState)
    const { disabled, error, required } = useErrorBrandManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createBrand })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedBrandState) } })
        setPrevFormData(structuredClone(preloadedBrandState))
    }, [preloadedBrandState])

    const resetForm = () => {
        dispatch({ type: 'reset', payload: { formData: structuredClone(prevFormData) } })
    }

    const handleChange = (name: Action['type'], value: string) => {
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