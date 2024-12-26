import { lazy, useEffect, useRef, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { Cedula } from '../../../modules/employee/employee/domain/Cedula'

interface Props {
  value: Primitives<Cedula>
  onChange: OnHandleChange
  isForm?: boolean
}
const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

export default function CedulaInput({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === 0) {
      isFirstInput.current = value === 0
      return
    }

    const isValid = Cedula.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : Cedula.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <FormInput
      id='cedula'
      isRequired={isForm}
      name="cedula"
      type="number"
      label='Cedula'
      placeholder='-- Ingrese la Cedula del usuario'
      handle={(event) => {
        const { name, value } = event.target
        onChange(name, value, Operator.CONTAINS)
      }}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
    />
  )
}
