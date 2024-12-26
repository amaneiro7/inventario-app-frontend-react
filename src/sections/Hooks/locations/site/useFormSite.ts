import React, { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"
import { useErrorSiteManagement } from "./useErrorSiteManagement"
import { DefaultSiteProps } from "@/sections/Hooks/locations/site/DefaultSiteInitialState"
import { useSiteInitialState } from "@/sections/Hooks/locations/site/SiteFormInitialState"

export const initialSiteState: DefaultSiteProps = {
    id: undefined,
    name: '',
    address: '',
    cityId: '',
    updatedAt: undefined
}

export type Action =
    | { type: 'init', payload: { formData: DefaultSiteProps } }
    | { type: 'reset', payload: { formData: DefaultSiteProps } }
    | { type: 'name', payload: { value: string } }
    | { type: 'address', payload: { value: string } }
    | { type: 'cityId', payload: { value: string } }

const reducer = (state: DefaultSiteProps, action: Action): DefaultSiteProps => {
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
    if (action.type === 'address') {
        return {
            ...state,
            address: action.payload.value
        }
    }
    if (action.type === 'cityId') {
        return {
            ...state,
            cityId: action.payload.value
        }
    }

}

export function useFormSite(defaultInitialState?: DefaultSiteProps) {
    const { useSite: { createSite } } = useAppContext()
    const { preloadedSiteState, isAddForm, setResetState } = useSiteInitialState(defaultInitialState ?? initialSiteState)
    const [prevFormData, setPrevFormData] = useState(preloadedSiteState)
    const [formData, dispatch] = useReducer(reducer, initialSiteState)
    const { disabled, error, required } = useErrorSiteManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createSite })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedSiteState) } })
        setPrevFormData(structuredClone(preloadedSiteState))
    }, [preloadedSiteState])

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