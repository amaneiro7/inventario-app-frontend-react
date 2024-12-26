import { lazy, Suspense } from "react"
import { useFormEmployee } from "@/sections/Hooks/employee/useFormEmployee"
import { type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"

interface Props {
  initialDialogValue?: DefaultEmployeeProps
  handleClose: () => void
}
const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const EmployeeInputs = lazy(async () => import("@/sections/page/FormEmployee/EmployeInputs").then(m => ({ default: m.EmployeeInputs })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))


export function EmployeeDialog({ initialDialogValue, handleClose }: Props) {
  const { disabled, error, formData, handleChange, handleSubmit, required, processing } = useFormEmployee(initialDialogValue)
  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }

  return (
    <Suspense>
      <FormComponent
        key='employee-dialog-form'
        id='employee-dialog-form'
        isDisabled={processing}
        handleSubmit={onSubmit}
        method='dialog'
        handleClose={handleClose}
      >
        <Suspense>
          <Subtitle variant='h5' color='black' textTransform='capitalize' text='Agregar un nuevo usuario' />
          <Paragraph variant='p' color='gray' text='¿No existe el usuario en la lista? Por favor, añada uno nuevo' />
        </Suspense>
        <Suspense>
          <EmployeeInputs 
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