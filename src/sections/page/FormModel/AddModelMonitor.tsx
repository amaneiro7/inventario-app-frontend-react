import { lazy, Suspense } from 'react'
import { ScreenSize } from '@/modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize'
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from '@/sections/Hooks/model/DefaultInitialModelState'

interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
    disabled: FormModelDisabled
    error: FormModelErrors
    required: FormModelRequired
}

const NumberInput = lazy(async () => import('@/sections/components/number-inputs/NumberInput').then(m => ({ default: m.NumberInput })))
const Checkbox = lazy(async () => import('@/sections/components/checkbox/Checbox').then(m => ({ default: m.Checkbox })))

export function AddModelMonitor({ formData, onChange, disabled, error, required }: Props) {
    return (
      <>
        <div className='flex gap-4'>
          <Suspense>
            <NumberInput
              name='screenSize'
              label='Tamaño de la Pantalla'
              value={formData.screenSize}
              onChange={(event) => {
                const { name, value } = event.target
                onChange(name, value)
              }}
              isRequired={required.screenSize}
              disabled={disabled.screenSize}
              error={!!error.screenSize}
              errorMessage={error.screenSize}
              min={ScreenSize.MIN}
              max={ScreenSize.MAX}
            />
          </Suspense>
        </div>
        <Suspense>
          <div className='grid md:grid-cols-3 grid-flow-row gap-4'>
            <Checkbox
              label='Tiene Puerto VGA'
              text='¿Tiene Puerto VGA?'
              name='hasVGA'
              value={formData.hasVGA ?? true}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked)
              }}
              required={required.hasVGA}
              disabled={disabled.hasVGA}
            />
            <Checkbox
              label='Tiene Puerto DVI'
              text='¿Tiene Puerto DVI?'
              name='hasDVI'
              value={formData.hasDVI ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked)
              }}
              required={required.hasDVI}
              disabled={disabled.hasDVI}
            />
            <Checkbox
              label='Tiene Puerto HDMI'
              text='¿Tiene Puerto HDMI?'
              name='hasHDMI'
              value={formData.hasHDMI ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked)
              }}
              required={required.hasHDMI}
              disabled={disabled.hasHDMI}
            />
          </div>
        </Suspense>
      </>
      
    )
}