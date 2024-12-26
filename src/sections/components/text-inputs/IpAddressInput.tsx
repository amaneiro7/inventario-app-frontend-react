import { lazy } from 'react'
import { type IPAddress } from '@/modules/devices/fetures/computer/domain/IPAddress'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { Operator } from '@/modules/shared/domain/criteria/FilterOperators'

interface Props {
  value: Primitives<IPAddress>  
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function IpAddressInput({ value, error, isDisabled, isRequired, onChange }: Props) {
  return (
    <Input
      id='ipAddress'
      name='ipAddress'
      type='text'
      label='Direccion IP'
      isRequired={isRequired}
      disabled={isDisabled}
      onChange={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          const newValue = isDisabled ? '' : value
          onChange(name, newValue, Operator.CONTAINS)
        }}
      value={value ?? ''}
      error={!!error}
      errorMessage={error}
    />
  )
}