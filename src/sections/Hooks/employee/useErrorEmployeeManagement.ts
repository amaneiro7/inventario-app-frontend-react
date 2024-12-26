import { useEffect, useRef, useState } from "react";
import { EmployeeUserName } from "@/modules/employee/employee/domain/UserName"
import { type FormEmployeeDisabled, type FormEmployeeErrors, FormEmployeeRequired, type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState";

export function useErrorEmployeeManagement({ userName }: DefaultEmployeeProps) {
    const isFirstUserNameInput = useRef(true)
    const [error, setError] = useState<FormEmployeeErrors>({
        userName: ''
    })
    const [disabled, setDisabled] = useState<FormEmployeeDisabled>({
        userName: false
    })

    const [required, setRequired] = useState<FormEmployeeRequired>({
        userName: true
    })

    useEffect(() => {
        if (isFirstUserNameInput.current || userName === '') {
            isFirstUserNameInput.current = userName.length < EmployeeUserName.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            userName: isFirstUserNameInput.current ? '' : EmployeeUserName.isValid(userName) ? '' : EmployeeUserName.invalidMessage(userName)
        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [userName])

    return {
        error,
        required,
        disabled
    }
}