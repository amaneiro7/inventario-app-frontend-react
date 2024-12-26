import { lazy, Suspense } from 'react'
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from '@/sections/Hooks/model/DefaultInitialModelState'

interface Props {
  formData: DefaultModelProps
  onChange: OnHandleChange
  disabled: FormModelDisabled
  error: FormModelErrors
  required: FormModelRequired
}

const InputTypeComboBox = lazy(async () => import('@/sections/components/combo_box/InputTypeComboBox').then(m => ({ default: m.InputTypeComboBox })))
const Checkbox = lazy(async () => import('@/sections/components/checkbox/Checbox').then(m => ({ default: m.Checkbox })))

export function AddModelKeyboard({ formData, onChange, required, disabled, error }: Props) {
    return (
      <div className='grid grid-flow-col gap-4'>
        <Suspense>
          <InputTypeComboBox
            onChange={onChange}
            type='form'
            value={formData.inputTypeId}
            error={error.inputTypeId}
            required={required.inputTypeId}
            disabled={disabled.inputTypeId}
          />
          <Checkbox
            label='Tiene lector de huella'
            text='¿Tiene lector de huella?'
            name='hasFingerPrintReader'
            value={formData.hasFingerPrintReader}
            handle={(event) => {
                const { name, checked } = event.target
                onChange(name, checked);
            }}
            required={required.hasFingerPrintReader}
            disabled={disabled.hasFingerPrintReader}
          />
        </Suspense>
      </div>
    )
}