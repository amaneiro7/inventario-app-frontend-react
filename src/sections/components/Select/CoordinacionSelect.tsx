import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CoordinacionId } from '../../../modules/employee/area/coordinacion/domain/CoordinacionId'
import { type GerenciaId } from '../../../modules/employee/area/gerencia/domain/GerenciaId'
import { useCoordinacion } from '../../Hooks/area/useCoordinacion'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<CoordinacionId>
  gerenciaId: Primitives<GerenciaId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

export default function CoordinacionSelect({ value, onChange, isRequired, gerenciaId }: Props) {
  const { coordinacion } = useCoordinacion()

  const coordinacionFiltered = coordinacion.filter((coordinacion) => coordinacion.gerenciaId === gerenciaId)

  return (
    <Suspense>
      <Select
        label='coordinacion'
        name='coordinacionId'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        options={coordinacionFiltered}
        placeholder='-- Filtre por Coordinacion --'
        isRequired={isRequired}
        isHidden={false}
        isDisabled={false}
        value={value}
      />
    </Suspense>
  )
}
