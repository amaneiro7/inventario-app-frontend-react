import { lazy } from 'react'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type StatusId } from '@/modules/devices/devices/status/domain/StatusId'
import { type MainCategoryId } from '@/modules/devices/mainCategory/domain/MainCategoryId'
import { type CategoryId } from '@/modules/devices/category/domain/CategoryId'
import { type BrandId } from '@/modules/devices/brand/domain/BrandId'
import { type ModelId } from '@/modules/devices/model/model/domain/ModelId'
import { type DeviceSerial } from '@/modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '@/modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceEmployee } from '@/modules/devices/devices/devices/domain/DeviceEmployee'
import { type DeviceLocation } from '@/modules/devices/devices/devices/domain/DeviceLocation'
import { type DeviceStockNumber } from '@/modules/devices/devices/devices/domain/DeviceStockNumber'
import { type DeviceObservation } from '@/modules/devices/devices/devices/domain/DeviceObservation'
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired } from '@/sections/Hooks/device/DefaultInitialState'

const StatusComboBox = lazy(async () => await import('@/sections/components/combo_box/StatusComboBox'))
const CategoryComboBox = lazy(async () => await import('@/sections/components/combo_box/CategoryComboBox'))
const MainCategoryComboBox = lazy(async () => await import('@/sections/components/combo_box/MainCategoryComboBox'))
const BrandComboBox = lazy(async () => await import('@/sections/components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('@/sections/components/combo_box/ModelComboBox'))
const SerialInput = lazy(async () => await import('@/sections/components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('@/sections/components/text-inputs/ActivoInput'))
const EmployeeComboBox = lazy(async () => await import('@/sections/components/combo_box/EmployeeComboBox'))
const LocationComboBox = lazy(async () => await import('@/sections/components/combo_box/LocationComboBox'))
const ObservationInput = lazy(async () => await import('@/sections/components/text-inputs/ObservationInput'))
const StockNumberInput = lazy(async () => import('@/sections/components/text-inputs/StockNumberInput').then(m => ({ default: m.StockNumberInput})))

export function MainFormInputs({
    statusId,
    mainCategoryId,
    categoryId,
    brandId,    
    modelId,        
    serial,
    activo,    
    employeeId,
    locationId,    
    stockNumber,    
    observation,
    isAddForm,
    errors,
    required,
    disabled,
    handleChange,
    handleModel,
    handleLocation
}: {
    statusId: Primitives<StatusId>
    mainCategoryId: Primitives<MainCategoryId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    modelId: Primitives<ModelId>
    serial: Primitives<DeviceSerial>
    activo: Primitives<DeviceActivo>
    employeeId: Primitives<DeviceEmployee>
    locationId: Primitives<DeviceLocation>
    stockNumber: Primitives<DeviceStockNumber>
    observation: Primitives<DeviceObservation>
    errors: FormDeviceErrors,
    required: FormDeviceRequired,
    disabled: FormDeviceDisabled,
    isAddForm: boolean
    handleChange: (name: string, value: string) => void
    handleModel: ({ value, memoryRamSlotQuantity, memoryRamType }: { value: string; memoryRamSlotQuantity?: number; memoryRamType?: string }) => void
    handleLocation: ({ value, typeOfSiteId }: { value: string; typeOfSiteId?: string }) => void
}) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-5 gap-y-6'>      
      <StatusComboBox
        value={statusId}
        onChange={handleChange}
        isDisabled={disabled.statusId}
        isRequired={required.statusId}
        error={errors.statusId}
        type='form'
      />
      <MainCategoryComboBox
        value={mainCategoryId}
        onChange={handleChange}
        isDisabled={disabled.mainCategoryId}
        isRequired={required.mainCategoryId}
        error={errors.mainCategoryId}
        type='form'
        isAdd={isAddForm}
      />
      
      
      <CategoryComboBox
        value={categoryId}
        mainCategory={mainCategoryId}
        onChange={handleChange}
        isDisabled={disabled.categoryId}
        isRequired={required.categoryId}
        error={errors.categoryId}
        type='form'
        isAdd={isAddForm}
      />
      
      
      <BrandComboBox
        value={brandId}
        onChange={handleChange}
        isDisabled={disabled.brandId}
        isRequired={required.brandId}
        error={errors.brandId}
        categoryId={categoryId}
        type='form'
        isAdd={isAddForm}
      />
      
      
      <ModelComboBox
        value={modelId}
        handleModel={handleModel}
        categoryId={categoryId}
        brandId={brandId}
        type='form'
        isAdd={isAddForm}
        isDisabled={disabled.modelId}
        isRequired={required.modelId}
        error={errors.modelId}
      />
      
      
      <SerialInput
        value={serial}
        onChange={handleChange}
        isDisabled={disabled.serial}
        isRequired={required.serial}
        error={errors.serial}
        type='form'
        isAdd={isAddForm}
      />
      
      
      <ActivoInput
        value={activo}
        onChange={handleChange}
        isDisabled={disabled.activo}
        isRequired={required.activo}
        error={errors.activo}
        isForm
      />
      
      
      <EmployeeComboBox
        onChange={handleChange}
        isDisabled={disabled.employeeId}
        isRequired={required.employeeId}
        error={errors.employeeId}
        name='employeeId'
        type='form'
        status={statusId}
        value={employeeId}
      />
      
      <div className='flex gap-5 col-span-2'>
        
        <LocationComboBox
          handleLocation={handleLocation}
          value={locationId}
          statusId={statusId}
          isDisabled={disabled.locationId}
          isRequired={required.locationId}
          error={errors.locationId}
          type='form'
        />
        
        
        <StockNumberInput
          onChange={handleChange}
          isDisabled={disabled.stockNumber}
          isRequired={required.stockNumber}
          error={errors.stockNumber}
          value={stockNumber}
        />
        
      </div>        
      
      <ObservationInput
        onChange={handleChange}
        isDisabled={disabled.observation}
        isRequired={required.observation}
        error={errors.observation}
        value={observation}
      />
      
    </div>
  )
}
