import { useEffect, useMemo, useRef, useState } from "react"
import { FormStatus, useGenericForm } from "@/sections/Hooks/useGenericForm"
import { useGenericFormData } from "@/sections/Hooks/useGenericFormData"
import { UserPassword } from "@/sections/../modules/user/user/domain/UserPassword"
import { useUserChangePassword } from "@/sections/Hooks/user/useUserChangePassword"
import { type ChangePasswordParams } from "@/modules/user/user/application/changePassoword"
import { type ModalRef } from "@/sections/components/Dialog/Modal"

const initialState: ChangePasswordParams = {
    password: '',
    newPassword: '',
    reTypePassword: ''
}

export function useChangePassword(): {
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    handleClose: () => void
    handleOpenModal: () => void
    handleCloseModal: () => void
    isDisabled: boolean
    errors: ChangePasswordParams
    formData: ChangePasswordParams
    dialogRef: React.Ref<ModalRef>
    formId: string
    valid: {
        password: boolean
        newPassword: boolean
        reTypePassword: boolean
    }
} {
    const [errors, setErrors] = useState(initialState)
    const formId = 'change-password-form'
    const [valid, setValid] = useState({ password: false, newPassword: false, reTypePassword: false })
    const isPasswordFirstInput = useRef(true)
    const isNewPasswordFirstInput = useRef(true)
    const isReTypePasswordFirstInput = useRef(true)
    const dialogRef = useRef<ModalRef>(null)

    const { changePassword } = useUserChangePassword()
    const { formData, updateForm, resetForm } = useGenericFormData(initialState)
    const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: changePassword })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        submitForm(formData)
        dialogRef.current?.handleClose()
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        updateForm({ [ev.target.name]: ev.target.value })
    }

    const handleClose = () => {
        resetForm()
    }

    const handleOpenModal = () => {
        dialogRef.current?.handleOpen()
    }

    const handleCloseModal = () => {
        dialogRef.current?.handleClose()
    }

    const isDisabled = useMemo(() => {
        return !valid.password || !valid.newPassword || !valid.reTypePassword
    }, [valid.newPassword, valid.password, valid.reTypePassword])

    useEffect(() => {
        if (isPasswordFirstInput.current || formData.password === '') {
            isPasswordFirstInput.current = formData.password?.length <= UserPassword.HAS_MIN_LENGTH
        }
        if (isNewPasswordFirstInput.current || formData.newPassword === '') {
            isNewPasswordFirstInput.current = formData.newPassword?.length <= UserPassword.HAS_MIN_LENGTH
        }
        if (isReTypePasswordFirstInput.current || formData.reTypePassword === '') {
            isReTypePasswordFirstInput.current = formData.reTypePassword?.length <= UserPassword.HAS_MIN_LENGTH
        }

        const isPasswordValid = isPasswordFirstInput.current ? true : UserPassword.isValid(formData.password)
        const isNewPasswordValid = isNewPasswordFirstInput.current ? true : UserPassword.isValid(formData.newPassword)
        const isReTypePasswordValid = isReTypePasswordFirstInput.current ? true : formData.newPassword === formData.reTypePassword

        setValid({
            password: UserPassword.isValid(formData.password),
            newPassword: UserPassword.isValid(formData.newPassword),
            reTypePassword: UserPassword.isValid(formData.newPassword) && formData.newPassword === formData.reTypePassword,
        })

        setErrors({
            password: isPasswordValid ? '' : UserPassword.invalidMessage(),
            newPassword: isNewPasswordValid ? '' : UserPassword.invalidMessage(),
            reTypePassword: isReTypePasswordValid ? '' : 'La contraseña no coinciden'
        })
    }, [formData])


    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            resetFormStatus()
            resetForm()
        }
        if (formStatus === FormStatus.Error) {
            resetFormStatus()
        }
    }, [formStatus, resetForm, resetFormStatus])

    return {
        handleSubmit,
        handleChange,
        handleClose,
        handleOpenModal,
        handleCloseModal,
        isDisabled,
        dialogRef,
        errors,
        valid,
        formData,
        formId
    }
}