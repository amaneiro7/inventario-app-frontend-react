import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useRegisterPage } from '../useRegisterPage'
import { FormStatus } from '@/sections/Hooks/useGenericForm'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'

const Input = lazy(() => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const FormComponent = lazy(async () => import('@/sections/components/formContainer/FormComponent').then(m => ({ default: m.FormComponent })))
const RoleComboBox = lazy(async () => import('@/sections/components/combo_box/RolesComboBox'))
const DetailsBoxWrapper = lazy(async () => import('@/sections/components/DetailsWrapper/DetailsBoxWrapper'))
export default function RegisterPage() {
 const { formData, errors, handleChange, handleSubmit, handleClose, formStatus } = useRegisterPage()
  const location = useLocation()
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name, e.target.value)
  }

  return (
    <Suspense>
      <DetailsBoxWrapper position='center'>
        <Suspense>
          <FormComponent
            id={location.key}
            key={location.key}
            title='Usuario'
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            isDisabled={formStatus === FormStatus.Loading}
          >
            <div className='flex flex-col md:flex-row md:gap-8'>
              <Suspense fallback={<InputSkeletonLoading />}>                  
                <Input
                  label='Nombre'
                  type='text'
                  name='name'
                  onChange={handleOnChange}
                  value={formData.name}
                  errorMessage={errors.name}
                  error={errors.name ? true : false}                    
                  isRequired
                />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>                  
                <Input
                  label='Apellido'
                  type='text'
                  name='lastName'
                  onChange={handleOnChange}
                  value={formData.lastName}
                  errorMessage={errors.lastName}
                  error={errors.lastName ? true : false}                    
                  isRequired
                />
              </Suspense>

            </div>
            <Suspense fallback={<InputSkeletonLoading />}>                  
              <Input
                label='Correo Electrónico'
                type='email'
                name='email'
                onChange={handleOnChange}
                value={formData.email}
                errorMessage={errors.email}
                error={errors.email ? true : false}                    
                isRequired
              />
            </Suspense>
            <Suspense>
              <RoleComboBox 
                onChange={handleChange}
                value={formData.roleId}
                type='form'
              />
            </Suspense>
          </FormComponent>
        </Suspense>
      </DetailsBoxWrapper>
    </Suspense>
  )
}
