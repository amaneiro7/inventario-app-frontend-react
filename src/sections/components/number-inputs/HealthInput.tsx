import { lazy } from 'react'
import { HardDriveHealth } from '@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'


interface Props {
  value: Primitives<HardDriveHealth>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function HealthInput({ value, onChange, error, isDisabled, isRequired }: Props) {  
  return (
    <NumberInput
      name='health'
      label='Health'
      onChange={(event) => {
          const { name, value } = event.target
          onChange(name, Number(value))
        }}
      placeholder='--- Ingrese el estado de salud del Disco ---'
      value={value}
      isRequired={isRequired}
      disabled={isDisabled}
      max={HardDriveHealth.NAME_MAX_LENGTH}
      min={HardDriveHealth.NAME_MIN_LENGTH}
      error={!!error}
      errorMessage={error}
    />    
  )
}
