import { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"
import { useErrorProcessorManagement } from "./useErrorProcessorManagement"
import { useProcessorInitialState } from "./ProcessorFormInitialState"
import { type DefaultProcessorProps } from "./DefaultInitialBrandState"

export const initialProcessorState: DefaultProcessorProps = {
    id: undefined,
    name: '',
    cores: 1,
    frequency: 1,
    threads: false,
    numberModel: "",
    productCollection: "",
}

export type Action =
    | { type: 'init', payload: { formData: DefaultProcessorProps } }
    | { type: 'reset', payload: { formData: DefaultProcessorProps } }
    | { type: 'name', payload: { value: string } }
    | { type: 'cores', payload: { value: string } }
    | { type: 'frequency', payload: { value: string } }
    | { type: 'threads', payload: { value: boolean } }
    | { type: 'numberModel', payload: { value: string } }
    | { type: 'productCollection', payload: { value: string } }

const reducer = (state: DefaultProcessorProps, action: Action): DefaultProcessorProps => {
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
    if (action.type === 'cores') {
        const cores = Number(action.payload.value)
        return {
            ...state,
            cores
        }
    }
    if (action.type === 'frequency') {
        const frequency = Number(action.payload.value)
        return {
            ...state,
            frequency
        }
    }
    if (action.type === 'threads') {
        return {
            ...state,
            threads: action.payload.value
        }
    }
    if (action.type === 'numberModel') {
        return {
            ...state,
            numberModel: action.payload.value
        }
    }
    if (action.type === 'productCollection') {
        return {
            ...state,
            productCollection: action.payload.value
        }
    }

}

export function useFormProcessor(defaultInitialState?: DefaultProcessorProps) {
    const { useProcessor: { createProcessor } } = useAppContext()
    const { preloadedProcessorState, isAddForm, setResetState } = useProcessorInitialState(defaultInitialState ?? initialProcessorState)
    const [prevFormData, setPrevFormData] = useState(preloadedProcessorState)
    const [formData, dispatch] = useReducer(reducer, initialProcessorState)
    const { disabled, error, required } = useErrorProcessorManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createProcessor })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedProcessorState) } })
        setPrevFormData(structuredClone(preloadedProcessorState))
    }, [preloadedProcessorState])

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