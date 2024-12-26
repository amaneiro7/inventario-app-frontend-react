import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormEmployee } from '@/sections/Hooks/employee/useFormEmployee'

const InfoBox = lazy(async () => import('@/sections/components/info-box/InfoBox').then(m => ({ default: m.InfoBox })))
const InfoBoxTitle = lazy(async () => import('@/sections/components/info-box/InfoBoxTitle').then(m => ({ default: m.InfoBoxTitle })))
const InfoBoxText = lazy(async () => import('@/sections/components/info-box/InfoBoxText').then(m => ({ default: m.InfoBoxText })))
const EmployeeSearchComboBox = lazy(async () => import('@/sections/components/combo_box/search/EmployeeSearchComboBox').then(m => ({default: m.EmployeeSearchComboBox})))
const EmployeeInputs = lazy(async () => import('./EmployeInputs').then(m => ({default: m.EmployeeInputs})))
const FormContainer = lazy(async () => await import('@/sections/components/formContainer/formContainer'))

export default function CreateEmployeeForm() {
  const location = useLocation()
  const { disabled, error, formData, handleChange, handleClose, handleSubmit, isAddForm, processing, required, resetForm } = useFormEmployee()

  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='Empleado'
        description='Ingrese los datos del usuario el cual desea registar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/employee/add'
        searchInput={<EmployeeSearchComboBox />}
      >
        <Suspense>
          <EmployeeInputs
            key={location.key}
            disabled={disabled}
            error={error}
            formData={formData}
            handleChange={handleChange}
            required={required}
          />
        </Suspense>
        {formData.devices.length > 0 &&
              formData.devices.map(({ id, category, brand, model, serial, location, computer }) =>
              (
                <Suspense key={id}>
                  <InfoBox>
                    <InfoBoxTitle title={category?.name} url={`/device/edit/${id}`} />
                    <InfoBoxText desc='Marca' text={brand?.name} />
                    <InfoBoxText desc='Modelo' text={model?.name} />
                    <InfoBoxText desc='Serial' text={serial} />
                    <InfoBoxText desc='Ubicación' text={location?.name} />
                    {computer !== null && <InfoBoxText desc='Dirección IP' text={computer?.ipAddress} />}
                  </InfoBox>
                </Suspense>
              )
              )}
      </FormContainer>
    </Suspense>
  )
}
