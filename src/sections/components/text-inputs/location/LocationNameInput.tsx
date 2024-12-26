import { lazy } from 'react'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type LocationName } from '@/modules/location/locations/domain/LocationName'
import { Operator } from '@/modules/shared/domain/criteria/FilterOperators'



interface Props {
    value: Primitives<LocationName>
    onChange: OnHandleChange
    siteName?: string
    isAddForm?: boolean
    type?: 'form' | 'search' | 'dialog'
    error?: string
    disabled?: boolean
    required?: boolean
}

const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const ReadOnlyInputBox = lazy(async () => import('@/sections/components/ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))


export function LocationNameInput({ value = '', onChange, type = 'form', isAddForm, disabled = false, error, required }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        onChange(name, value.trimStart(), Operator.CONTAINS)
    }

    return (
      
      <>
        {((!isAddForm && type === 'form'))
            ? <ReadOnlyInputBox label='Nombre del sitio' required defaultValue={value} />
            : <Input
                id='name'
                isRequired={required}
                disabled={disabled}
                name='name'
                type='text'
                label='Nombre del sitio'
                onChange={handleChange}
                value={value}
                error={!!error}
                errorMessage={error}
              />}
      </>
      
    )
}
