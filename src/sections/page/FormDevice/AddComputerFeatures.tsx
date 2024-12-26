import { lazy } from 'react'
import { type OnHandleChange } from '@/modules/shared/domain/types/types'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type ComputerName } from '@/modules/devices/fetures/computer/domain/ComputerName'
import { type IPAddress } from '@/modules/devices/fetures/computer/domain/IPAddress'
import { type ProcessorId } from '@/modules/devices/fetures/processor/domain/ProcessorId'
import { type MemoryRamValues } from '@/modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { type MemoryRamCapacity } from '@/modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { type MACAddress } from '@/modules/devices/fetures/computer/domain/MACAddress'
import { type OperatingSystemId } from '@/modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '@/modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type HardDriveTypeId } from '@/modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type HardDriveCapacityId } from '@/modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type MemoryRamTypeName } from '@/modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeName'
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired } from '@/sections/Hooks/device/DefaultInitialState'

interface Props {
  onChange: OnHandleChange
  handleMemory: (value: string, index: number) => void
  errors: FormDeviceErrors,
  required: FormDeviceRequired,
  disabled: FormDeviceDisabled
  computerName: Primitives<ComputerName>
  processorId: Primitives<ProcessorId>
  memoryRam?: Primitives<MemoryRamValues>[]
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  memoryRamType?: Primitives<MemoryRamTypeName>
  hardDriveCapacityId?: Primitives<HardDriveCapacityId>
  hardDriveTypeId?: Primitives<HardDriveTypeId>
  operatingSystemArqId?: Primitives<OperatingSystemArqId>
  operatingSystemId?: Primitives<OperatingSystemId>
  ipAddress: Primitives<IPAddress>
  macAddress?: Primitives<MACAddress>
}

const ComputerNameInput = lazy(async () => import('@/sections/components/text-inputs/ComputerNameInput').then(m => ({ default: m.ComputerNameInput })))
const ProcessorComboBox = lazy(async () => import('@/sections/components/combo_box/ProcessorComboBox'))
const MemoryRamCapacityInput = lazy(async () => import('@/sections/components/number-inputs/MemoryRamCapacityInput').then(m => ({ default: m.MemoryRamCapacityInput })))
const OperatingSystemComboBox = lazy(async () => import('@/sections/components/combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(async () => import('@/sections/components/combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))
const HardDriveCapacityComboBox = lazy(async () => import('@/sections/components/combo_box/HardDriveCapacityComboBox').then(m => ({ default: m.HardDriveCapacityComboBox })))
const HardDriveTypeComboBox = lazy(async () => import('@/sections/components/combo_box/HardDriveTypeComboBox'))
const MacAddressInput = lazy(async () => import('@/sections/components/text-inputs/MacAddressInput'))
const IpAddressInput = lazy(async () => import('@/sections/components/text-inputs/IpAddressInput').then(m => ({ default: m.IpAddressInput })))
const MemoryRamCapacitySlotInput = lazy(async () => import('@/sections/components/number-inputs/MemoryRamCapacitySlotInput').then(m => ({ default: m.MemoryRamCapacitySlotInput })))
const ReadOnlyInputBox = lazy(async () => import('@/sections/components/ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export default function AddComputerFeatures({ 
  computerName,
  ipAddress,
  processorId,
  memoryRam,
  memoryRamCapacity,  
  memoryRamType,
  hardDriveCapacityId,
  hardDriveTypeId,
  operatingSystemId,
  operatingSystemArqId,
  macAddress,
  disabled,
  errors,
  required,
  onChange, 
  handleMemory 
}: Props) {

  return (
    <>
      
      <ComputerNameInput
        onChange={onChange}
        value={computerName}
        isRequired={required.computerName}
        isDisabled={disabled.computerName}
        error={errors.computerName}
      />
      
      
      <IpAddressInput
        onChange={onChange}
        value={ipAddress}
        isRequired={required.ipAddress}
        isDisabled={disabled.ipAddress}
        error={errors.ipAddress}
      />
      
      
      <ProcessorComboBox
        onChange={onChange}
        value={processorId}
        type='form'
        isRequired={required.processorId}
        isDisabled={disabled.processorId}
        error={errors.processorId}
      />
      
      <div className='grid grid-cols-2 gap-4 md:col-span-2'>
        <div className='grid grid-cols-2 gap-4'>
          {memoryRam.length > 0 ?
          memoryRam?.map((_, index) => (
            <MemoryRamCapacitySlotInput
              key={`memRam-${index}`}
              index={index}
              onChange={handleMemory}
              value={memoryRam[index]}              
            />
        )) : null}

        </div>
        <div className='flex gap-4'>
          
          <MemoryRamCapacityInput
            value={memoryRamCapacity}              
            isRequired={required.memoryRamCapacity}
            isDisabled={disabled.memoryRamCapacity}
            error={errors.memoryRamCapacity}
          />
          
          
          <ReadOnlyInputBox
            label='Tipo de Memoria'              
            defaultValue={memoryRamType}
          />
          

        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          
          <HardDriveCapacityComboBox
            onChange={onChange}
            value={hardDriveCapacityId}
            type='form'
            isRequired={required.hardDriveCapacityId}
            isDisabled={disabled.hardDriveCapacityId}
            error={errors.hardDriveCapacityId}
          />
          
        </div>
        <div>
          
          <HardDriveTypeComboBox
            onChange={onChange}
            value={hardDriveTypeId}
            type='form'
            isRequired={required.hardDriveTypeId}
            isDisabled={disabled.hardDriveTypeId}
            error={errors.hardDriveTypeId}
          />
          
        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          
          <OperatingSystemComboBox
            onChange={onChange}
            value={operatingSystemId}
            type='form'
            isRequired={required.operatingSystemId}
            isDisabled={disabled.operatingSystemId}
            error={errors.operatingSystemId}
          />
          
        </div>
        <div>
          
          <OperatingSystemArqComboBox
            onChange={onChange}
            value={operatingSystemArqId}
            type='form'
            isRequired={required.operatingSystemArqId}
            isDisabled={disabled.operatingSystemArqId}
            error={errors.operatingSystemArqId}
          />
          
        </div>
      </div>
      
      <MacAddressInput
        onChange={onChange}
        value={macAddress}
        isRequired={required.macAddress}
        isDisabled={disabled.macAddress}
        error={errors.macAddress}
      />
      
    </>
  )
}
