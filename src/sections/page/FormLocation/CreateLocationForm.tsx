import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormLocation } from '../../Hooks/locations/useFormLocation'

const FormContainer = lazy(async () => import('@/sections/components/formContainer/formContainer'))
const LocationInputs = lazy(async () => import('./LocationInputs').then(m => ({ default: m.LocationInputs })))

export default function CreateLocationForm() {
    
    const location = useLocation()
    const { isAddForm, formData, handleChange, handleClose, handleSite, handleSubmit, resetForm, processing, disabled, error, required } = useFormLocation()

    return (      
      <FormContainer
        key={location.key}
        title='Ubicación'
        description='Ingrese los datos de la nueva ubicación a registrar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/location/add'
      >
        <Suspense>
          <LocationInputs isAddForm={isAddForm} disabled={disabled} error={error} required={required} formData={formData} handleSite={handleSite} onChange={handleChange} />
        </Suspense>
      </FormContainer>   
    )
}
