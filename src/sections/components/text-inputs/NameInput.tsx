import { useEffect, useRef, useState, lazy } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { EmployeeName } from '../../../modules/employee/employee/domain/Name'

interface Props {
  value: Primitives<EmployeeName>
  onChange: OnHandleChange
  isForm?: boolean
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

export default function EmployeeNameInput ({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = EmployeeName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : EmployeeName.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [isForm, value])
  return (
    <FormInput
      id='name'
      isRequired={isForm}
      name='name'
      type='text'
      label='Nombre'
      placeholder='-- Ingrese el Nombre del usuario'
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
