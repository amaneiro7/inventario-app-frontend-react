import { lazy, useMemo } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type ComputerOsArq } from "../../../modules/devices/fetures/computer/domain/ComputerOSArq"
import { type OperatingSystemArqPrimitives } from "../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"

interface Props {
  value: Primitives<ComputerOsArq>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

export function OperatingSystemArqComboBox({ value, error, isDisabled = false, isRequired, onChange, type = 'search' }: Props) {
  const { useOperatingSystemArq: { operatingSystemArq, loading }} = useAppContext()

  const initialValue = useMemo(() => {
    return operatingSystemArq.find(os => os.id === value)
  }, [operatingSystemArq, value])

  return (
    <>
      <ComboBox
        id='operatingSystemArqId'
        initialValue={initialValue}
        label='Arquitectura'
        name='operatingSystemArqId'
        type={type}
        onChange={(_, newValue: OperatingSystemArqPrimitives) => {
          onChange('operatingSystemArqId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={operatingSystemArq}
        isRequired={isRequired}
        isDisabled={isDisabled}
        loading={loading}
        isError={!!error}
        errorMessage={error}
      />
    </>
  )
}