import { lazy, Suspense } from 'react'
import { useMemoryRamType } from '../../Hooks/memoryRam/useMemoryRamType'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type MemoryRamTypeId } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeId'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<MemoryRamTypeId>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function MemoryRamTypeSelect({ value, onChange, isForm }: Props) {
  const { memoryRamTypes } = useMemoryRamType()

  return (
    <Suspense>
      <Select
        label='Typo de Memoria'
        name='memoryRamTypeId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={memoryRamTypes}
        placeholder='-- Filtre por Tipo de Memoria --'
        isRequired={isForm}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
