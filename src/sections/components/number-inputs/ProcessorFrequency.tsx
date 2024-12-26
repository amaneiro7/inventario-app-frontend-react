import {lazy, Suspense } from 'react'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { ProcessorFrequency } from '@/modules/devices/fetures/processor/domain/ProcessorFrequency'

interface Props {
    value: number
    onChange: OnHandleChange
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function ProcessorFrequencyInput({ value, onChange, error, isDisabled, isRequired }: Props) {
    return (
      <Suspense>
        <NumberInput
          name='frequency'
          label='Frecuencia'
          onChange={(event) => {
                    const { name, value } = event.target
                    onChange(name, value)
                }}
          value={value}
          disabled={isDisabled}
          isRequired={isRequired}
          max={ProcessorFrequency.MAX}
          min={ProcessorFrequency.MIN}
          error={!!error}
          errorMessage={error}
        />
      </Suspense>
    )
}

