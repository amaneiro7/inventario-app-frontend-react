import { lazy, Suspense, useMemo } from 'react'
import { useFormDevice } from '@/sections/Hooks/device/useGenericFormData'
import { Computer } from '@/modules/devices/fetures/computer/domain/Computer'
import { HardDrive } from '@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { MFP } from '@/modules/devices/fetures/multiFunctionalPrinter/MFP'
import Loading from '@/sections/components/Loading'

const FormContainer = lazy(async () => await import('@/sections/components/formContainer/formContainer'))
const DeviceSearchComboBox = lazy(async () => import('@/sections/components/combo_box/search/DeviceSearchComboBox'))
const MainFormInputs = lazy(async () => await import('./MainFormInputs').then(m => ({ default: m.MainFormInputs})))
const AddComputerFeatures = lazy(async () => await import('./AddComputerFeatures'))
const AddHardDriveFeatures = lazy(async () => await import('./AddHardDriveFeatures'))
const AddMFPFeatures = lazy(async () => await import('./AddMFPFeatures'))

export default function CreateDeviceForm() {
  const { handleChange, resetForm, handleMemory, handleModel, handleLocation, handleClose, handleSubmit, isAddForm, formData, processing, disabled, error, required } = useFormDevice()
  const categoryType = useMemo(() => {
    return Computer.isComputerCategory({ categoryId: formData.categoryId }) ? 'computer' :
    HardDrive.isHardDriveCategory({ categoryId: formData.categoryId }) ? 'hardDrive' :
    MFP.isMFPCategory({ categoryId: formData.categoryId }) ? 'mfp' : null
  }, [formData.categoryId])

  
  return (
    <Suspense fallback={<Loading />}>
      <FormContainer
        key='device-form'
        title='Dispositivo'
        description='Ingrese los datos del dispositivo.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        updatedBy={formData.history}
        url='/device/add'
        searchInput={<DeviceSearchComboBox />}
      >
        
        <MainFormInputs 
          handleChange={handleChange}
          handleModel={handleModel}
          handleLocation={handleLocation}
          isAddForm={isAddForm}
          disabled={disabled}
          errors={error}
          required={required}
          statusId={formData.statusId}
          categoryId={formData.categoryId}
          mainCategoryId={formData.mainCategoryId}
          brandId={formData.brandId}
          modelId={formData.modelId}
          serial={formData.serial}
          activo={formData.activo}
          employeeId={formData.employeeId}
          locationId={formData.locationId}
          stockNumber={formData.stockNumber}
          observation={formData.observation}
        />
        
        <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4'>
          {(categoryType === 'computer' && formData.modelId) ?
            <Suspense>
              <AddComputerFeatures
                handleMemory={handleMemory} 
                onChange={handleChange}
                disabled={disabled}
                errors={error}
                required={required}            
                computerName={formData.computerName}
                processorId={formData.processorId}
                memoryRam={formData.memoryRam}
                memoryRamCapacity={formData.memoryRamCapacity}
                memoryRamType={formData.memoryRamType}
                hardDriveCapacityId={formData.hardDriveCapacityId}
                hardDriveTypeId={formData.hardDriveTypeId}
                operatingSystemArqId={formData.operatingSystemArqId}
                operatingSystemId={formData.operatingSystemId}
                ipAddress={formData.ipAddress}
                macAddress={formData.macAddress}
              />
            </Suspense>
        : null}
          {categoryType === 'hardDrive' ? 
            <Suspense>
              <AddHardDriveFeatures
                onChange={handleChange}
                hardDriveCapacityId={formData.hardDriveCapacityId}
                hardDriveTypeId={formData.hardDriveTypeId}
                health={formData.health}
                disabled={disabled}
                errors={error}
                required={required}
              /> 
            </Suspense>
        : null}
          {categoryType === 'mfp' ? 
            <Suspense>
              <AddMFPFeatures
                onChange={handleChange}
                ipAddress={formData.ipAddress}
                disabled={disabled}
                errors={error}
                required={required}
              /> 
            </Suspense>
        : null}
        </div>
      </FormContainer>
    </Suspense>
  )
}
