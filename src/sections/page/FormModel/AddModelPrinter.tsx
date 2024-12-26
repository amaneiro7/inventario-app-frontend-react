import { lazy, Suspense } from 'react'
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from '@/sections/Hooks/model/DefaultInitialModelState'
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
    disabled: FormModelDisabled
    error: FormModelErrors
    required: FormModelRequired

}
const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))

export function AddModelPrinter({ formData, onChange, disabled, error, required }: Props) {
    return (
      <div className='flex gap-4'>
        <Suspense>
          <Input
            id='cartridgeModel'
            name='cartridgeModel'
            type='text'
            label='Numero de Modelo del cartucho'          
            onChange={(event) => {
                const { name, value } = event.target
                onChange(name, value)
            }}                
            value={formData.cartridgeModel}
            isRequired={required.cartridgeModel}
            disabled={disabled.cartridgeModel}
            error={!!error.cartridgeModel}
            errorMessage={error.cartridgeModel}
          />
        </Suspense>
      </div>      
    )
}