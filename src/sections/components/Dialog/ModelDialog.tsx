import { lazy, Suspense } from "react"
import { useFormModel } from "@/sections/Hooks/model/useFormModel"
import { type DefaultModelProps } from "@/sections/Hooks/model/DefaultInitialModelState"
interface Props {
  initialDialogValue?: DefaultModelProps
  handleClose: () => void
}

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const ModelInputs = lazy(async () => import("@/sections/page/FormModel/ModelFeatures").then(m => ({ default: m.ModelInputs })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))

export default function ModelDialog({ handleClose, initialDialogValue }: Props) {
  const { disabled, error, formData, handleChange, handleSubmit, required, processing } = useFormModel(initialDialogValue)
  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }
  return (    
    <Suspense>
      <FormComponent
        key='model-dialog-form'
        id='model-dialog-form'
        isDisabled={processing}
        handleSubmit={onSubmit}
        method='dialog'
        handleClose={handleClose}
      >
        <Suspense>
          <Subtitle variant='h5' color='black' textTransform='capitalize' text='Agregar un nuevo modelo' />
          <Paragraph variant='p' color='gray' text='¿No existe el modelo en la lista? Por favor, añada uno nuevo.' />
        </Suspense>
        <Suspense>
          <ModelInputs 
            disabled={disabled} 
            error={error} 
            formData={formData} 
            onChange={handleChange} 
            required={required}
          />
        </Suspense>
      </FormComponent>
    </Suspense>
  )
}