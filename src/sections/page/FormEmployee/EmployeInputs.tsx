import { lazy, Suspense } from "react"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { type FormEmployeeDisabled, type FormEmployeeErrors, type FormEmployeeRequired, type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"

const EmployeeUserNameInput = lazy(async () => await import('@/sections/components/text-inputs/UserNameInput').then(m => ({ default: m.EmployeeUserNameInput })))
interface Props {
    disabled: FormEmployeeDisabled
    error: FormEmployeeErrors
    required: FormEmployeeRequired
    formData: DefaultEmployeeProps
    handleChange: (name: string, value: string) => void
}

export function EmployeeInputs ({ required, disabled, error, formData, handleChange }: Props) {
    return (
      <>
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeUserNameInput
            value={formData.userName}            
            onChange={handleChange}
            error={error.userName}
            isDisabled={disabled.userName}
            isRequired={required.userName}
          />
        </Suspense>
        
      </>
    )
}