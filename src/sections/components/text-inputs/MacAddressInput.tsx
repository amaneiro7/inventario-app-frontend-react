import { lazy } from 'react'
import { type MACAddress } from '../../../modules/devices/fetures/computer/domain/MACAddress'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

interface Props {
  value: Primitives<MACAddress>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({ default: m.Input })))

export default function MacAddressInput ({ value, onChange, error, isDisabled, isRequired }: Props)  {
  return (    
    <Input
      id='macAddress'
      name='macAddress'
      type='text'
      label='Direccion MAC'
      isRequired={isRequired}
      disabled={isDisabled}
      onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
      value={value ?? ''}
      error={!!error}
      errorMessage={error}
    />
  )
}
