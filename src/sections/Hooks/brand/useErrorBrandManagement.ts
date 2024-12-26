import { useEffect, useRef, useState } from "react"
import { BrandName } from "@/modules/devices/brand/domain/BrandName"
import { type FormBrandDisabled, type FormBrandErrors, FormBrandRequired, type DefaultBrandProps } from "@/sections/Hooks/brand/DefaultInitialBrandState"

export function useErrorBrandManagement({ name }: DefaultBrandProps) {
    const isFirstUserNameInput = useRef(true)
    const [error, setError] = useState<FormBrandErrors>({
        name: ''
    })
    const [disabled, setDisabled] = useState<FormBrandDisabled>({
        name: false
    })

    const [required, setRequired] = useState<FormBrandRequired>({
        name: true
    })

    useEffect(() => {
        if (isFirstUserNameInput.current || name === '') {
            isFirstUserNameInput.current = name?.length < BrandName.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            name: isFirstUserNameInput.current ? '' : BrandName.isValid(name) ? '' : BrandName.invalidMessage(name)
        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [name])

    return {
        error,
        required,
        disabled
    }
}