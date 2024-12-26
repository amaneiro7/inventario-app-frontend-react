import { lazy } from 'react'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type DeviceObservation } from '../../../modules/devices/devices/devices/domain/DeviceObservation'

interface Props {
  value: Primitives<DeviceObservation>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export default function ObservationInput ({ value, error, isDisabled, isRequired, onChange }: Props) {
  return (    
    <Input
      id='observation'
      isRequired={isRequired}
      disabled={isDisabled}
      name='observation'
      type='textarea'
      label='Observacion'
      placeholder=''
      onChange={(event) => {
            const { name, value } = event.target
            onChange(name, value, Operator.CONTAINS)
          }}
      value={value}
      error={!!error}
      errorMessage={error}
    />    
  )
}
