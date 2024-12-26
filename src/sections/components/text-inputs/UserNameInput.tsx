import { lazy } from 'react'
import { type EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

interface Props {
  value: Primitives<EmployeeUserName>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function EmployeeUserNameInput ({ value, error, isDisabled, isRequired, onChange}: Props) {   
  return (
    <Input
      id='userName'
      name='userName'
      type='text'
      label='Nombre de Usuario'        
      onChange={(event) => {
            const { name, value } = event.target
            onChange(name, value)
          }}
      value={value}
      isRequired={isRequired}
      disabled={isDisabled}
      error={!!error}
      errorMessage={error}
    />
  )
}
