import { useCallback, useState } from 'react'
import { tostPromise } from '../utils/toaster'

export function useGenericForm2<T>({ create }: { create: (formData: T) => Promise<unknown> }): {
    submitForm: (formData: T, fn?: () => void) => Promise<void>
    processing: boolean
} {
    const [processing, setProcessing] = useState<boolean>(false)

    const submitForm = useCallback(async (formData: T, fn?: () => void) => {
        setProcessing(true)
        tostPromise(create(formData)
            .then((res) => {
                fn();
                return res
            }), {
            loading: 'Procesando...',
            success: () => {
                return 'Operacion exitosa'
            },
            error() {

                return `Ha ocurrido un error`
            },
            description(data) {
                return `${data?.message}`
            },
            duration: 3500,
            onAutoClose: () => {

            },
            finally() {
                setProcessing(false)
            },
            onDismiss() {

            },
        })
    }, [create])
    return {
        submitForm,
        processing,
    }
}
