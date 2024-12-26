import { lazy, memo, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { type StatusPrimitives } from "@/modules/devices/devices/status/domain/Status"

interface Props {
    value: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

function StatusComboBox({ value, onChange, error, isDisabled = false, isRequired, type = 'search' }: Props) {
    const { useStatus: { status, loading }} = useAppContext()

    const initialValue = useMemo(() => {
        return status.find(status => status.id === value)
    }, [status, value])

    return (
      <ComboBox
        id='statusId'
        initialValue={initialValue}
        label='Estatus'
        name='statusId'
        type={type}
        onChange={(_, newValue: StatusPrimitives) => {
                    onChange('statusId', newValue ? newValue.id : '', Operator.EQUAL)                    
                }}
        options={status}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isError={!!error}
        errorMessage={error}
        loading={loading}
      />
    )
}

export default memo(StatusComboBox)