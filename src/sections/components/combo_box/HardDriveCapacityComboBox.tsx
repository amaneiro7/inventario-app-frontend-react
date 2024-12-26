import { lazy, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type ComputerHDDCapacity } from "@/modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { type HardDrivePrimitives } from "@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

interface Props {
    value: Primitives<ComputerHDDCapacity>    
    onChange: OnHandleChange
    type?: 'form' | 'search'
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
  }

  const ComboBox = lazy(async() => import("./combo_box"))  

export function HardDriveCapacityComboBox ({ value, error, isDisabled = false, isRequired, onChange, type = 'search' }: Props) {
    const { useHardDriveCapacity: { hardDriveCapacity, loading } } = useAppContext()
    
    const initialValue = useMemo(() => {
        return hardDriveCapacity.find(hddtype => hddtype.id === value)
    }, [hardDriveCapacity, value])

    return (
      <>
        <ComboBox
          id='hardDriveCapacityId'
          initialValue={initialValue}
          label='Disco Duro'
          name='hardDriveCapacityId'
          type={type}
          onChange={(_, newValue: HardDrivePrimitives) => {
                    onChange('hardDriveCapacityId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
          options={hardDriveCapacity}
          isRequired={isRequired}
          isDisabled={isDisabled}
          loading={loading}
          isError={!!error}
          errorMessage={error}
        />
      </>
    )
}