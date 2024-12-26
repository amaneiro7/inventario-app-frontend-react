import { lazy, Suspense } from 'react'
import { ProcessorCores } from '../../../modules/devices/fetures/processor/domain/ProcessorCores'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

interface Props {
    value: Primitives<ProcessorCores>
    onChange: OnHandleChange
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function ProcessorCoresInput({ value, onChange, error, isDisabled, isRequired }: Props) {    
    return (
      <Suspense>
        <NumberInput
          name='cores'
          label='Cores'
          onChange={(event) => {
                    const { name, value } = event.target
                    onChange(name, value)
                }}
          value={value}
          isRequired={isRequired}
          disabled={isDisabled}
          max={ProcessorCores.MAX}
          min={ProcessorCores.MIN}
          step={value === 1 ? 1 : ProcessorCores.STEPS}
          error={!!error}
          errorMessage={error}
        />
      </Suspense>
    )
}

