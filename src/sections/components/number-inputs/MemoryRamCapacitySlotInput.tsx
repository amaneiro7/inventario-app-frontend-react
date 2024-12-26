import { lazy, useEffect, useState } from 'react'
import { MemoryRamValues } from '@/modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type Event } from '@/modules/shared/domain/types/types'

interface Props {
  value: Primitives<MemoryRamValues>
  index: number
  onChange: (value: string, index: number) => void
}

const Input = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamCapacitySlotInput({ value, index, onChange }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const isValid = MemoryRamValues.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamValues.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [index, value])

  return (
    <Input
      name='memoryRam'
      label={`Memoria Ram Slot ${index}`}
      type='number'
      value={value}
      onChange={(event: Event) => {
        const { value } = event.target
        onChange(value, index)
      }}
      max={MemoryRamValues.max}
      min={MemoryRamValues.min}
      step={MemoryRamValues.minStep * 2}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}