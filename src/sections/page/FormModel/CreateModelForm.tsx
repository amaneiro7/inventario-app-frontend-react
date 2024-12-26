import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormModel } from '@/sections/Hooks/model/useFormModel'

const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))
const ModelInputs = lazy(async () => import('./ModelFeatures').then(m => ({ default: m.ModelInputs })))

export default function CreateModelForm() {
  const location = useLocation()
  const { isAddForm, formData, error, disabled, required, processing, handleChange, handleClose, handleSubmit, resetForm } = useFormModel()
 
  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='Modelo'
        description='Ingrese los datos del modelo el cual desea registar, la categoria y la marca la cual va ser relacionada.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/model/add'
      >
        <Suspense>
          <ModelInputs 
            key={location.key}
            isAddForm={isAddForm} 
            formData={formData} 
            onChange={handleChange}
            disabled={disabled}
            error={error}
            required={required}
          />
        </Suspense>
      </FormContainer>
    </Suspense>
  )
}
