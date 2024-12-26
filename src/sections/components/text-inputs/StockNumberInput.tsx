import { lazy } from 'react'
import { Operator } from '@/modules/shared/domain/criteria/FilterOperators'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type DeviceStockNumber } from '@/modules/devices/devices/devices/domain/DeviceStockNumber'

interface Props {
  value: Primitives<DeviceStockNumber>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function StockNumberInput({ value, error, isDisabled, isRequired, onChange }: Props) {

  return (
    <Input
      id='stockNumber'
      name='stockNumber'
      type='text'
      label='N° Stock'
      isRequired={isRequired}
      disabled={isDisabled}
      className='max-w-40'
      onChange={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          const newValue = isDisabled ? '' : value
          onChange(name, newValue.toUpperCase(), Operator.CONTAINS)
        }}
      value={value ?? ''}
      error={!!error}
      errorMessage={error}
    />
  )
}
