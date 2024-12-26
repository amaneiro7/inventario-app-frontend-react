import { lazy} from 'react'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type ProcessorNumberModel } from '@/modules/devices/fetures/processor/domain/ProcessorNumberModel'


interface Props {
  value: Primitives<ProcessorNumberModel>
  onChange: OnHandleChange
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function ProcessorNumberModelInput({ value, onChange, error, isDisabled, isRequired }: Props) {
  return (
    <Input
      id='numberModel'
      name='numberModel'
      type='text'
      label='Numero de modelo del procesador' 
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