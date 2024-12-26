import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormProcessor } from '@/sections/Hooks/processor/useFormProcessor'

const FormContainer = lazy(async () => import('@/sections/components/formContainer/formContainer'))
const ProcessorInputs = lazy(async () => import('./ProcessorInputs').then(m => ({default: m.ProcessorInputs})))

export default function CreateProcessorForm() {
  const location = useLocation()
  const { disabled, error, formData, handleChange, handleClose, handleSubmit, isAddForm, processing, required, resetForm } = useFormProcessor()
  

  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='Processador'
        description='Ingrese los datos del modelo el cual desea registar, la categoria y la marca la cual va ser relacionada.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        url='/processor/add'
      >
        <Suspense>
          <ProcessorInputs
            key={location.key}
            disabled={disabled}
            error={error}
            formData={formData}
            handleChange={handleChange}
            required={required}
          />
        </Suspense>
      </FormContainer>
    </Suspense>

  )
}
