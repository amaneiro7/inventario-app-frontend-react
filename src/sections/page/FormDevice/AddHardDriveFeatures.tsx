import { lazy } from 'react'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type HardDriveHealth } from '@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type HardDriveCapacityId } from '@/modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '@/modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired } from '@/sections/Hooks/device/DefaultInitialState'
interface Props {
  onChange: OnHandleChange
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>
  errors: FormDeviceErrors,
  required: FormDeviceRequired,
  disabled: FormDeviceDisabled
}

const HardDriveCapacityComboBox = lazy(async () => import('@/sections/components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('@/sections/components/combo_box/HardDriveTypeComboBox'))
const HealthInput = lazy(async () => await import('@/sections/components/number-inputs/HealthInput').then(m => ({ default: m.HealthInput })))

export default function AddHardDriveFeatures({ 
  hardDriveCapacityId,
  hardDriveTypeId,
  health, 
  disabled, 
  errors, 
  required,
  onChange 
}: Props) {
  return (
    <>
      
      <HealthInput
        onChange={onChange}
        value={health}          
        isRequired={required.health}
        isDisabled={disabled.health}
        error={errors.health}
      />
      
      
      <HardDriveCapacityComboBox
        onChange={onChange}
        value={hardDriveCapacityId}
        type='form'
        isRequired={required.hardDriveCapacityId}
        isDisabled={disabled.hardDriveCapacityId}
        error={errors.hardDriveCapacityId}
      />
      
      
      <HardDriveTypeComboBox
        onChange={onChange}
        value={hardDriveTypeId}
        type='form'
        isRequired={required.hardDriveTypeId}
        isDisabled={disabled.hardDriveTypeId}
        error={errors.hardDriveTypeId}
      />
      
    </>
  )
}
