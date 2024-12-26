import { lazy, Suspense } from 'react'
import { MemoryRamSlotQuantity } from '@/modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'
import { type FormModelDisabled, type FormModelErrors, type FormModelRequired, type DefaultModelProps } from '@/sections/Hooks/model/DefaultInitialModelState'
import { type OnHandleChange } from "@/modules/shared/domain/types/types"

interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
    disabled?: FormModelDisabled
    error?: FormModelErrors
    required?: FormModelRequired
    categoryType: "computer" | "laptop" | "monitor" | "printer" | "keyboard"
}
const MemoryRamTypeComboBox = lazy(async () => import('@/sections/components/combo_box/MemoryRamTypeComboBox').then(m => ({ default: m.MemoryRamTypeComboBox })))
const NumberInput = lazy(async () => import('@/sections/components/number-inputs/NumberInput').then(m => ({ default: m.NumberInput })))
const Checkbox = lazy(async () => import('@/sections/components/checkbox/Checbox').then(m => ({ default: m.Checkbox })))
const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))


export function AddModelComputer({ formData, onChange, disabled, error, required, categoryType }: Props) {    
    return (
      <>
        <div className='flex gap-4'>
          <Suspense>
            <MemoryRamTypeComboBox
              value={formData.memoryRamTypeId}
              onChange={onChange}
              type='form'
              error={error.memoryRamTypeId}
              disabled={disabled.memoryRamTypeId}
              required={required.memoryRamTypeId}

            />
          </Suspense>
          <Suspense>
            <NumberInput
              name='memoryRamSlotQuantity'
              label='Cantidad de Ranuras'
              type='number'
              isRequired={required.memoryRamSlotQuantity}
              value={formData.memoryRamSlotQuantity}
              onChange={(event) => {
                  const {name, value} = event.target
                  onChange(name, value)
              }}
              error={!!error.memoryRamSlotQuantity}
              errorMessage={error.memoryRamSlotQuantity}
              min={MemoryRamSlotQuantity.MIN}
              max={MemoryRamSlotQuantity.MAX}
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
                  onChange(name, checked);
              }}
            />
            <Checkbox
              label='Tiene Puerto DVI'
              text='¿Tiene Puerto DVI?'
              name='hasDVI'
              value={formData.hasDVI ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked);
              }}
            />
            <Checkbox
              label='Tiene Puerto HDMI'
              text='¿Tiene Puerto HDMI?'
              name='hasHDMI'
              value={formData.hasHDMI ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked);
              }}
            />
            <Checkbox
              label='Tiene BlueTooth'
              text='¿Tiene Bluetooth?'
              name='hasBluetooth'
              value={formData.hasBluetooth ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked);
              }}
            />
            <Checkbox
              label='Tiene WiFi'
              text='¿Tiene Adaptador Wifi?'
              name='hasWifiAdapter'
              value={formData.hasWifiAdapter ?? false}
              handle={(event) => {
                  const { name, checked } = event.target
                  onChange(name, checked);
              }}
            />
          </div>
        </Suspense>
         
        {categoryType === 'laptop' ?
          <Input
            id='batteryModel'
            name='batteryModel'
            type='text'
            label='Numero de Modelo de Bateria'
            onChange={(event) => {
              const { name, value } = event.target
              onChange(name, value)
            }}
            value={formData.batteryModel}
            isRequired={required.batteryModel}
            error={!!error.batteryModel}
            disabled={disabled.batteryModel}
            errorMessage={error.batteryModel}
          />
        : null}
      </>
    )
}