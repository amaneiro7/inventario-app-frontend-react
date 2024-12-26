import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type CargoId } from '../../../modules/employee/cargo/domain/CargoId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { useCargo } from '../../Hooks/cargo/useCargo'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<CargoId>
  onChange: OnHandleChange
  isRequired?: boolean
}

export default function CargoSelect({ value, onChange, isRequired }: Props) {
  const { cargo } = useCargo()

  return (
    <Suspense>
      <Select
        label='Cargo'
        name='cargoId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={cargo}
        placeholder='-- Filtre por Cargo --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
