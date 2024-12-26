import { lazy, Suspense } from "react"
import { useFormLocation } from "@/sections/Hooks/locations/useFormLocation"
import { type DefaultLocationProps } from "@/sections/Hooks/locations/DefaulLocationtInitialState"

interface Props {
  initialDialogValue?: DefaultLocationProps
  handleClose: () => void
}

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const LocationInputs = lazy(async () => import("../../page/FormLocation/LocationInputs").then(m => ({ default: m.LocationInputs })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))

export function LocationDialog({ handleClose, initialDialogValue }: Props) {
  const { formData, handleChange, handleSite, handleSubmit, processing, disabled, error, required } = useFormLocation(initialDialogValue)

  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }

  return (
    <Suspense>
      <FormComponent
        key='location-dialog-form'
        id='location-dialog-form'
        isDisabled={processing}
        handleSubmit={onSubmit}
        method='dialog'
        handleClose={handleClose}
      >
        <Suspense>
          <Subtitle variant='h5' color='black' textTransform='capitalize' text='Agregar una nueva ubicación' />
          <Paragraph variant='p' color='gray' text='¿No existe la ubicación en la lista? Por favor, añada uno nuevo.' />
        </Suspense>
        <Suspense>
          <LocationInputs 
            isAddForm
            formData={formData} 
            handleSite={handleSite}
            onChange={handleChange} 
            disabled={disabled}
            error={error}
            required={required}
          />
        </Suspense>
      </FormComponent>
    </Suspense>    
  )
}