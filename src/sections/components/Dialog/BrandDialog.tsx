import { lazy, Suspense } from "react"
import { useFormBrand } from "@/sections/Hooks/brand/useFormBrand"
import { type DefaultBrandProps } from "@/sections/Hooks/brand/DefaultInitialBrandState"
interface Props {
  initialDialogValue?: DefaultBrandProps
  handleClose: () => void
}

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const BrandInput = lazy(async () => import("@/sections/page/FormBrand/BrandInputs").then(m => ({ default: m.BrandInputs })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))

export function BrandDialog({ initialDialogValue, handleClose }: Props) {
  const { disabled, error, formData, handleChange, handleSubmit, processing, required } = useFormBrand(initialDialogValue)

  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }
  
  return (
    <Suspense>
      <FormComponent
        title='Agregar una nueva marca'                
        key='brand-dialog-form'
        id='brand-dialog-form'
        isDisabled={processing}
        handleSubmit={onSubmit}
        method='dialog'
        handleClose={handleClose}        
      >
        <Subtitle variant='h5' color='black' textTransform='capitalize' text='Agregar una nueva marca' />
        <Paragraph variant='p' color='gray' text='¿No existe la marca en la lista? Por favor, añada uno nuevo.' />
        <Suspense>
          <BrandInput
            disabled={disabled}
            error={error}
            formData={formData}
            handleChange={handleChange}
            required={required}
          />
        </Suspense>
      </FormComponent>
    </Suspense>
  )
}