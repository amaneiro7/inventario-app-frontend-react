import { lazy, Suspense } from "react";
import { useFormProcessor } from "@/sections/Hooks/processor/useFormProcessor";
import { type DefaultProcessorProps } from "@/sections/Hooks/processor/DefaultInitialBrandState";
interface Props {
  initialDialogValue?: DefaultProcessorProps
  handleClose: () => void
}

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const ProcessorInputs = lazy(async () => import("@/sections/page/FormProcessor/ProcessorInputs").then(m => ({ default: m.ProcessorInputs })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))

export default function ProcessorDialog({ initialDialogValue, handleClose }: Props) {
    
  const {disabled, error, formData, handleChange, handleSubmit, required, processing } = useFormProcessor(initialDialogValue)
  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }
    return (
      <Suspense>
        <FormComponent
          key='processor-dialog-form'
          id='processor-dialog-form'
          isDisabled={processing}
          handleSubmit={onSubmit}
          method='dialog'
          handleClose={handleClose}
        >
          <Suspense>
            <Subtitle variant='h5' color='black' textTransform='capitalize' text='Agregar un nuevo procesador' />
            <Paragraph variant='p' color='gray' text='¿No existe el procesador en la lista? Por favor, añada uno nuevo' />
          </Suspense>
          <Suspense>
            <ProcessorInputs
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