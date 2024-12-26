import { Suspense, lazy } from 'react'
import { operatorArray } from '../../../modules/shared/domain/criteria/FilterOperators'
import { SelectChangeEvent } from '@mui/material';

const Select = lazy(async () => await import('./Select'))

interface Props {
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
}

export function FilterOperator({ onChange }: Props) {
  return (
    <Suspense>
      <Select
        label='Operador'
        name='operator'
        defaultValue=''
        placeholder='Selecciona el operador'
        onChange={onChange}
        options={operatorArray}
        isHidden={true}
        isDisabled={false}
      />
    </Suspense>
  )
}
