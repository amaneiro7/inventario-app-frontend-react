import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaId } from '../../../modules/employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutivaId'
import { useVicepresidenciaEjecutiva } from '../../Hooks/area/useVicepresidenciaEjecutiva'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<VicepresidenciaEjecutivaId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

export default function VicepresidenciaEjecutivaSelect({ value, onChange, isRequired }: Props) {
  const { vicepresidenciaEjecutiva } = useVicepresidenciaEjecutiva()

  return (
    <Suspense>
      <Select
        label='vicepresidenciaEjecutiva'
        name='vicepresidenciaEjecutivaId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={vicepresidenciaEjecutiva}
        placeholder='-- Filtre por VPE --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
