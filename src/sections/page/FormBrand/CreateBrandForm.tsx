import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormBrand } from '@/sections/Hooks/brand/useFormBrand'

const BrandInput = lazy(async () => import('./BrandInputs').then(m => ({ default: m.BrandInputs })))
const FormContainer = lazy(async () => import('@/sections/components/formContainer/formContainer'))

export default function CreateBrandForm() {
  const location = useLocation()
  const { isAddForm, formData, error, disabled, required, processing, resetForm, handleChange, handleClose, handleSubmit } = useFormBrand()

  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='marca'
        description='Ingrese los datos de la marca el cual desea registar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        url='/brand/add'
      >
        <Suspense>
          <BrandInput 
            key={location.key}
            formData={formData}
            handleChange={handleChange}
            disabled={disabled}
            error={error}
            required={required}
          />
        </Suspense>
      </FormContainer>
    </Suspense>
  )
}
