import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type StatePrimitives } from "../../../../modules/location/state/domain/state"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type StateId } from "../../../../modules/location/state/domain/StateId"
import { type RegionId } from "../../../../modules/location/region/domain/RegionId"
import { useAppContext } from "../../../Context/AppProvider"


interface Props {
    value?: Primitives<StateId>
    region?: Primitives<RegionId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: 'form' | 'search'
    error?: string
    disabled?: boolean
    required?: boolean
}

const ReadOnlyInputBox = lazy(async () => import('../../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))
const ComboBox = lazy(async () => import("./../combo_box"))

export function StateComboBox({ value, region, onChange, type = 'search', isAddForm = false, error, disabled = false, required }: Props) {
    const { useCountryStates: { state, loading }} = useAppContext()
    
    const filtered = useMemo(() => {
        if (!region) return state
        return state.filter(sta => sta.regionId === region)
    }, [state, region])

    const initialValue = useMemo(() => {
        return filtered.find(sta => sta.id === value)
    }, [filtered, value])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        {!isAddForm && type == 'form'
            ? <ReadOnlyInputBox label='Estado' required defaultValue={initialValue?.name} />
            : <ComboBox
                id='stateId'
                initialValue={initialValue}
                label='Estado'
                name='stateId'
                type={type}
                onChange={(_, newValue: StatePrimitives) => {
                    onChange('stateId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={filtered}
                isDisabled={disabled}
                isRequired={required}
                isError={!!error}
                errorMessage={error}
                loading={loading}
              />}
      </Suspense>
    )
}