import { lazy, useLayoutEffect, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'



interface Props {
  value: Primitives<MemoryRamSlotQuantity>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamSlotQuantityInput({ value = MemoryRamSlotQuantity.MIN, type = 'form', onChange }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useLayoutEffect(() => {
    if (type !== 'form') return

    const isValid = MemoryRamSlotQuantity.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamSlotQuantity.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [type, value])

  return (
    <NumberInput
      name='memoryRamSlotQuantity'
      label='Cantidad de Ranuras'
      isRequired={type === 'form'}
      type='number'
      value={value}
      onChange={(event) => {
        const {name, value} = event.target
        onChange(name, value)
    }}
      error={isError}
      errorMessage={errorMessage}
      min={MemoryRamSlotQuantity.MIN}
      max={MemoryRamSlotQuantity.MAX}
    />    
  )
}