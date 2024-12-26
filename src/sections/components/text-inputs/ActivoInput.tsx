import { lazy } from 'react'
import { Operator } from '@/modules/shared/domain/criteria/FilterOperators'
import { type DeviceActivo } from '@/modules/devices/devices/devices/domain/DeviceActivo'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<DeviceActivo>
  onChange: OnHandleChange
  isForm?: boolean
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({ default: m.Input })))

export default function ActivoInput({ value, error, isDisabled, isRequired, onChange }: Props) {  
  return (    
    <Input
      id='activo'
      name='activo'
      type='text'
      label='Activo'
      isRequired={isRequired}
      disabled={isDisabled}
      onChange={(event) => {
          // eslint-disable-next-line prefer-const
          let { name, value } = event.target
          value = value.trim().toUpperCase()
          onChange(name, value, Operator.CONTAINS)
        }}
      value={value}
      error={!!error}
      errorMessage={error}
    />
  )
}