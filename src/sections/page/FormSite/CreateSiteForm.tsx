import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormSite } from '../../Hooks/locations/site/useFormSite'

const FormContainer = lazy(async () => await import('@/sections/components/formContainer/formContainer'))
const SiteInputs = lazy(async () => await import('./SiteInputs').then(m => ({ default: m.SiteInputs })))

export default function CreateSiteForm() {
  const location = useLocation()
  const { disabled, error, formData, handleChange, handleClose, handleSubmit, isAddForm, processing, required, resetForm } = useFormSite()

  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='Sitio'
        description='Ingrese los datos del sitio el cual desea registar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/site/add'
      >
        <Suspense>
          <SiteInputs
            isAddForm={isAddForm}
            handleChange={handleChange}
            disabled={disabled}
            error={error}
            required={required}
            formData={formData}
          />
        </Suspense>
      </FormContainer>
    </Suspense>
  )
}
