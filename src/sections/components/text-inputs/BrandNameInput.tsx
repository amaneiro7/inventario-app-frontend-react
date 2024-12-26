import { lazy } from 'react'
import { type BrandName } from '../../../modules/devices/brand/domain/BrandName'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<BrandName>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({ default: m.Input })))

export function BrandNameInput({ value, onChange, error, isDisabled, isRequired }: Props) {
  return (
    <Input
      id='brand-name'
      name='name'
      type='text'
      label='Name'
      onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
      value={value}
      isRequired={isRequired}
      disabled={isDisabled}
      error={!!error}
      errorMessage={error}
    />
  )
}
