import { useEffect, useRef, useState } from "react"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { UserEmail } from "../../../modules/user/user/domain/UserEmail"
import { UserName } from "../../../modules/user/user/domain/UserName"
import { UserLastName } from "../../../modules/user/user/domain/UserLastName"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type UserApiResponsePrimitives } from "../../../modules/shared/domain/types/responseTypes"
import { useCreateUser } from "../../Hooks/user/useCreateUser"
import { UserRole } from "../../../modules/user/user/domain/UserRole"
import { useNavigate } from "react-router-dom"
import { useUserInitialState } from "./useUserInitialState"

export function useRegisterPage(): {
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleChange: OnHandleChange
    handleClose: () => void
    formStatus: FormStatus
    errors: { name: string, lastName: string, email: string, roleId: string }
    formData: UserApiResponsePrimitives
} {

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        email: '',
        roleId: ''
    })
    const isNameFirstInput = useRef(true)
    const isLastNameFirstInput = useRef(true)
    const isEmailFirstInput = useRef(true)

    const { createUser } = useCreateUser()
    const { preloadedState, setResetState } = useUserInitialState()
    const { formData, updateForm, resetForm } = useGenericFormData(preloadedState)
    const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: createUser })
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData)
    }

    const handleChange: OnHandleChange = (name, value) => {
        updateForm({ [name]: value })
    }

    const handleClose = () => {
        navigate('/user-management')
    }

    useEffect(() => {
        if (isEmailFirstInput.current || formData.email === '') {
            isEmailFirstInput.current = !formData.email.includes('@')
        }

        if (isNameFirstInput.current || formData.name === '') {
            isNameFirstInput.current = formData.name?.length <= UserName.NAME_MIN_LENGTH
        }
        if (isLastNameFirstInput.current || formData.name === '') {
            isLastNameFirstInput.current = formData.lastName?.length <= UserLastName.NAME_MIN_LENGTH
        }

        const isNameValid = isNameFirstInput.current ? true : UserName.isValid(formData.name)
        const isLastNameValid = isLastNameFirstInput.current ? true : UserLastName.isValid(formData.lastName)
        const isEmailValid = isEmailFirstInput.current ? true : UserEmail.isValid(formData.email)
        const isRoleValid = UserRole.isValid(formData.roleId)


        setErrors({
            email: isEmailValid ? '' : UserEmail.invalidMessage(formData.email),
            lastName: isLastNameValid ? '' : UserLastName.invalidMessage(),
            name: isNameValid ? '' : UserName.invalidMessage(),
            roleId: isRoleValid ? '' : UserRole.invalidMessage()
        })
    }, [formData])


    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            setResetState()
            resetFormStatus()
        }
        if (formStatus === FormStatus.Error) {
            resetFormStatus()
        }
    }, [formStatus, resetForm, resetFormStatus, setResetState])

    useEffect(() => {
        updateForm(preloadedState)
        return () => {
            resetForm()
        }
    }, [preloadedState, resetForm, updateForm])


    return {
        handleSubmit,
        handleChange,
        handleClose,
        errors,
        formStatus,
        formData
    }
}