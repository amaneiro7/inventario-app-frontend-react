import { lazy } from 'react'

import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type IPAddress } from '@/modules/devices/fetures/computer/domain/IPAddress'
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired } from '@/sections/Hooks/device/DefaultInitialState'
interface Props {
    onChange: OnHandleChange
    ipAddress: Primitives<IPAddress>
    errors: FormDeviceErrors,
    required: FormDeviceRequired,
    disabled: FormDeviceDisabled
}

const IpAddressInput = lazy(async () => import('@/sections/components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))
export default function AddMFPFeatures({ ipAddress, disabled, errors, required, onChange }: Props) {
  return (
    <IpAddressInput
      onChange={onChange}
      value={ipAddress}
      error={errors.ipAddress}
      isDisabled={disabled.ipAddress}
      isRequired={required.ipAddress}
    />
  )
}
