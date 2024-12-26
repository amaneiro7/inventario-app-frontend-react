import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { DeviceEmployee } from "@/modules/devices/devices/devices/domain/DeviceEmployee"
import { StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { initialEmployeeState } from "@/sections/Hooks/employee/useFormEmployee"
import { type EmployeePrimitives } from "@/modules/employee/employee/domain/Employee"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"

interface Props {
  value: Primitives<DeviceEmployee>
  name: string
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const DialogComponent = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ComboBox = lazy(async () => import("./combo_box"))
const EmployeeDialog = lazy(async () => import("../Dialog/EmployeeDialog").then(m => ({ default: m.EmployeeDialog})))

export default function EmployeeComboBox({ value, error, isDisabled = false, isRequired, name, onChange, type = 'search' }: Props) {
  const { useEmployee: { employees, loading } } = useAppContext()
  const [dialogValue, setDialogValue] = useState<DefaultEmployeeProps>(initialEmployeeState)
  const [open, setOpen] = useState(false)
  
  const employeeOptions = useMemo(() => (
    employees.map(employee => ({ id: employee.id, name: employee.userName }))
  ), [employees])

  const initialValue = useMemo(() => (
    employeeOptions.find(employee => employee.id === value)
  ), [employeeOptions, value])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <ComboBox
        id={name}
        initialValue={initialValue}
        label='Usuarios'
        name={name}
        type={type}
        onChange={(_, newValue: EmployeePrimitives & {
          inputValue: string
        }) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              handleOpen()
              setDialogValue({
                userName: newValue
              })
            })
          } else if (newValue && newValue.inputValue) {
            handleOpen()
            setDialogValue({
              userName: newValue.inputValue
            })
          } else {
            const hasNewValue = newValue ? newValue.id : ''
            onChange(name, hasNewValue, Operator.EQUAL)
          }
        }}
        options={employeeOptions}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isError={!!error}
        loading={loading}
        errorMessage={error}
      />
      
      {type === 'form' ?
        <Suspense>
          <DialogComponent open={open} handleClose={handleClose}>            
            <EmployeeDialog 
              initialDialogValue={dialogValue} 
              handleClose={handleClose}
            />
          </DialogComponent>
        </Suspense>
          : null}
    </>
  )
}