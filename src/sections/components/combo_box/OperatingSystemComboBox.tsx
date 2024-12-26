import { lazy, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type ComputerOs } from "@/modules/devices/fetures/computer/domain/ComputerOS"
import { type OperatingSystemPrimitives } from "@/modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem"

interface Props {
  value: Primitives<ComputerOs>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

export function OperatingSystemComboBox({ value, error, isDisabled = false, isRequired, onChange, type = 'search' }: Props) {
  const { useOperatingSystemVersions: { operatingSystem, loading } } = useAppContext()

  const initialValue = useMemo(() => {
    return operatingSystem.find(os => os.id === value)
  }, [operatingSystem, value])

  return (
    <>
      <ComboBox
        id='operatingSystemId'
        initialValue={initialValue}
        label='Sistemas Operativo'
        name='operatingSystemId'
        type={type}
        onChange={(_, newValue: OperatingSystemPrimitives) => {
          onChange('operatingSystemId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={operatingSystem}
        isRequired={isRequired}
        isDisabled={isDisabled}
        loading={loading}
        isError={!!error}
        errorMessage={error}
      />
    </>
  )
}