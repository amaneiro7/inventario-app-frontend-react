import { lazy } from 'react'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Subnet } from '../../../../modules/location/locations/domain/Subnet'

interface Props {
  value: Primitives<Subnet>  
  onChange: OnHandleChange
  error?: string
  disabled?: boolean
  required?: boolean
}

const Input = lazy(async () => import('./../Input').then(m => ({default: m.Input})))

export function SubnetInput({ value, onChange, required, error, disabled = false }: Props) {
  return (
    <>
      <Input
        id='subnet'
        name='subnet'
        type='text'
        label='Subnet'
        isRequired={required}
        onChange={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          
          onChange(name, value)
        }}
        value={value}
        error={!!error}
        errorMessage={error}
        disabled={disabled}
      />
    </>
  )
}
