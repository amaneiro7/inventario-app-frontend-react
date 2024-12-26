import { lazy } from 'react'
import { Operator } from '@/modules/shared/domain/criteria/FilterOperators'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type ComputerName } from '@/modules/devices/fetures/computer/domain/ComputerName'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'


interface Props {
  value: Primitives<ComputerName>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function ComputerNameInput({ value, error, isDisabled, isRequired, onChange,  }: Props) {
return (
  <Input
    id='computerName'
    isRequired={isRequired}
    disabled={isDisabled}
    name='computerName'
    type='text'
    label='Nombre del equipo'
    onChange={(event) => {
          const { name, value } = event.target          
          const newValue = isDisabled ? '' : value.trim().toUpperCase()
          onChange(name, newValue, Operator.CONTAINS)
        }}
    value={value}
    error={!!error}
    errorMessage={error}
  />
)
}
