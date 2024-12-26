import { Suspense, lazy } from 'react'
import { SelectChangeEvent } from '@mui/material';

const Select = lazy(async () => await import('./Select'))

interface Props {
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
  options: { id: string, name: string }[]
}

export function FilterField({ onChange, options }: Props) {


  return (
    <Suspense>
      <Select
        label='Campo'
        name='field'
        placeholder='Seleccion el campo'
        defaultValue=''
        onChange={onChange}
        options={options}
        isHidden={true}
        isDisabled={false}
      />
    </Suspense>
  )
}
