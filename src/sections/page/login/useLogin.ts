import { useCallback, useState } from "react"
import { useAuthContext } from "../../Context/AuthContext"
import { useErrorLoginManagement } from "./useErrorLoginManagement"
import { useGenericForm2 } from "@/sections/Hooks/useGenericForm2"

interface InitialState {
    email: string
    password: string
}

export function useLogin(): {
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    errors: InitialState
    loading: boolean
    formData: InitialState
    valid: { email: boolean; password: boolean }
    toggleShowPassword: boolean
    handleToggleShowPassowrd: () => void
} {
    const { useAuth: { getLogin } } = useAuthContext()
    const [formData, setFormData] = useState<InitialState>({ email: "", password: "" })
    const { errors, valid } = useErrorLoginManagement({ email: formData.email, password: formData.password })
    const { processing, submitForm } = useGenericForm2({ create: getLogin })
    const [toggleShowPassword, setToggleShowPassword] = useState(false)

    const resetPassword = useCallback(() => {
        setFormData(prev => ({ ...prev, password: '' }))
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData, resetPassword)
    }, [formData, resetPassword, submitForm])

    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
    }, [])

    const handleToggleShowPassowrd = useCallback(() => {
        setToggleShowPassword(!toggleShowPassword)
    }, [toggleShowPassword])


    return {
        handleSubmit,
        handleChange,
        errors,
        loading: processing,
        valid,
        formData,
        toggleShowPassword,
        handleToggleShowPassowrd
    }
}