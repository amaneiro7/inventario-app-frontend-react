import { Suspense, lazy } from 'react'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'
import { type Action } from '../../Hooks/locations/site/useFormSite'
import { type DefaultSiteProps, type FormSiteDisabled, type FormSiteErrors, type FormSiteRequired } from '@/sections/Hooks/locations/site/DefaultSiteInitialState'

const Input = lazy(async () => await import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const CityComboBox = lazy(async () => await import('@/sections/components/combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))

interface Props {
    isAddForm: boolean
    handleChange: (name: Action["type"], value: string) => void
    formData: DefaultSiteProps
    disabled: FormSiteDisabled
    required: FormSiteRequired
    error: FormSiteErrors
}

export function SiteInputs({
    isAddForm,
    handleChange,
    formData,
    disabled,
    required,
    error
}: Props) {
  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <CityComboBox
          isAddForm={isAddForm}
          onChange={handleChange}
          type='form'
          value={formData.cityId}
          disabled={disabled.cityId}
          required={required.cityId}
          error={error.cityId}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Input
          id='site-address'            
          name='address'
          type='text'
          label='Dirección del sitio'
          isRequired={required.address}
          disabled={disabled.address}
          value={formData.address}
          error={!!error.address}
          errorMessage={error.address}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              handleChange('address', value)
            }}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Input
          id='site-name'            
          name='name'
          type='text'
          label='Nombre del sitio'
          isRequired={required.name}
          disabled={disabled.name}
          value={formData.name}
          error={!!error.name}
          errorMessage={error.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              handleChange('name', value)
            }}
        />
      </Suspense>
    </>
  )
}
