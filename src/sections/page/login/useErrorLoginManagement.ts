import { useEffect, useRef, useState } from "react"
import { UserEmail } from "@/modules/user/user/domain/UserEmail"
import { UserPassword } from "@/modules/user/user/domain/UserPassword"

export function useErrorLoginManagement({
    email,
    password
}: {
    email: string
    password: string
}) {
    const [errors, setErrors] = useState({ email: '', password: '' })
    const [valid, setValid] = useState({ email: false, password: false })

    const isPasswordFirstInput = useRef(true)
    const isEmailFirstInput = useRef(true)

    useEffect(() => {
        if (isEmailFirstInput.current || email === '') {
            isEmailFirstInput.current = !email.includes('@')
        }

        if (isPasswordFirstInput.current || password === '') {
            isPasswordFirstInput.current = password?.length <= UserPassword.HAS_MIN_LENGTH
        }

        const isEmailValid = isEmailFirstInput.current ? true : UserEmail.isValid(email)
        const isPasswordValid = isPasswordFirstInput.current ? true : UserPassword.isValid(password)

        setValid(prev => ({
            ...prev,
            email: UserEmail.isValid(email),
            password: UserPassword.isValid(password),
        }))

        setErrors(prev => ({
            ...prev,
            email: isEmailValid ? '' : UserEmail.invalidMessage(email),
            password: isPasswordValid ? '' : UserPassword.invalidMessage()
        }))

        return () => {
            setErrors({ email: '', password: '' })
            setValid({ email: false, password: false })
        }
    }, [email, password])

    return {
        errors,
        valid
    }
}