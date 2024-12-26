import { lazy } from 'react'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'

interface Props {
  value: number
  onChange: OnHandleChange
  error?: string
  disabled?: boolean
  required?: boolean
}

const NumberInput = lazy(async () => await import('./NumberInput').then(m => ({ default: m.NumberInput })))


export function CodeAgencyInput({ value, onChange, disabled, error, required }: Props) { 
  return (
    <>
      <NumberInput
        name='codeAgency'
        label='Codigo de agencia'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        value={value}
        isRequired={required}
        disabled={disabled}
        max={599}
        min={1}
        error={!!error}
        errorMessage={error}
      />
    </>
  )
}
