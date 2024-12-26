import { lazy, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type HardDriveTypePrimitives } from "@/modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveType"
import { type HardDriveTypeId } from "@/modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId"

interface Props {
  value: Primitives<HardDriveTypeId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

export default function HardDriveTypeComboBox({ value, error, isDisabled = false, isRequired, onChange, type = 'search' }: Props) {
  const { useHardDriveType: { hardDriveType, loading } } = useAppContext()


  const initialValue = useMemo(() => {
    return hardDriveType.find(hddtype => hddtype.id === value)
  }, [hardDriveType, value])

  return (
    <>
      <ComboBox
        id='hardDriveTypeId'
        initialValue={initialValue}
        label='Tipo'
        name='hardDriveTypeId'
        type={type}
        onChange={(_, newValue: HardDriveTypePrimitives) => {
          onChange('hardDriveTypeId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={hardDriveType}
        isRequired={isRequired}
        isDisabled={isDisabled}
        loading={loading}
        isError={!!error}
        errorMessage={error}
      />
    </>
  )
}