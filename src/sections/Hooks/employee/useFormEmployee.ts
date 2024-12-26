import { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useEmployeeInitialState } from "@/sections/Hooks/employee/EmployeeFormInitialState"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"
import { useErrorEmployeeManagement } from "./useErrorEmployeeManagement"
import { type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"

export const initialEmployeeState: DefaultEmployeeProps = {
    id: undefined,
    userName: '',
    devices: [],
    updatedAt: undefined
}

export type Action =
    | { type: 'init', payload: { formData: DefaultEmployeeProps } }
    | { type: 'reset', payload: { formData: DefaultEmployeeProps } }
    | { type: 'userName', payload: { value: string } }

const reducer = (state: DefaultEmployeeProps, action: Action): DefaultEmployeeProps => {
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
    if (action.type === 'userName') {
        return {
            ...state,
            userName: action.payload.value
        }
    }

}

export function useFormEmployee(defaultInitialState?: DefaultEmployeeProps) {
    const { useEmployee: { createEmployee } } = useAppContext()
    const { preloadedEmployeeState, isAddForm, setResetState } = useEmployeeInitialState(defaultInitialState ?? initialEmployeeState)
    const [prevFormData, setPrevFormData] = useState(preloadedEmployeeState)
    const [formData, dispatch] = useReducer(reducer, initialEmployeeState)
    const { disabled, error, required } = useErrorEmployeeManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createEmployee })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedEmployeeState) } })
        setPrevFormData(structuredClone(preloadedEmployeeState))
    }, [preloadedEmployeeState])

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