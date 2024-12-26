import { useCallback, useState } from 'react'
import { tostPromise } from '../utils/toaster'

export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial
}

export function useGenericForm<T>({ create }: { create: (formData: T) => Promise<unknown> }): {
    formStatus: FormStatus
    submitForm: (formData: T) => Promise<void>
    resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial)

    const submitForm = useCallback(async (formData: T) => {
        setFormStatus(FormStatus.Loading)
        tostPromise(create(formData), {
            loading: 'Procesando...',
            success: () => {
                setFormStatus(FormStatus.Success)
                return 'Operacion exitosa'
            },
            error() {
                setFormStatus(FormStatus.Error)
                return `Ha ocurrido un error`
            },
            description(data) {
                return `${data?.message}`
            },
            duration: 5000,
            onAutoClose: () => {

            },
            onDismiss() {

            },

        })
    }, [create])


    const resetFormStatus = useCallback(() => {
        setFormStatus(FormStatus.Initial)
    }, [])

    return {
        formStatus,
        submitForm,
        resetFormStatus
    }
}
