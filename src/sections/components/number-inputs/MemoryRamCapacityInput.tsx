import { lazy } from 'react'
import { type MemoryRamValues } from '@/modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<MemoryRamValues>
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('../text-inputs/Input').then(m => ({ default: m.Input })))

export function MemoryRamCapacityInput({ value, isDisabled, error, isRequired  }: Props) {
  return (    
    <Input
      name='memoryRamCapacity'
      label='Total Memoria Ram'
      isRequired={isRequired}
      disabled={isDisabled}
      value={value}
      error={!!error}
      errorMessage={error}
      type='number'
      readOnly
      aria-readonly
      tabIndex={-1}
      onMouseDown={(e) => { e.preventDefault() }}
    />
    
  )
}