import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading"
import { type CityPrimitives } from "../../../../modules/location/city/domain/city"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type StateId } from "../../../../modules/location/state/domain/StateId"
import { type CityId } from "../../../../modules/location/city/domain/CityId"
import { type RegionId } from "../../../../modules/location/region/domain/RegionId"
import { useAppContext } from "../../../Context/AppProvider"

interface Props {
    value?: Primitives<CityId>
    state?: Primitives<StateId>
    region?: Primitives<RegionId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: "form" | "search"
    error?: string
    disabled?: boolean
    required?: boolean
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../../ReadOnlyInputBox").then((m) => ({ default: m.ReadOnlyInputBox })))

export function CityComboBox({ value, state, region, onChange, type = "search", isAddForm = false, error, disabled = false, required }: Props) {
    const { useCity: { cities, loading }} = useAppContext()
    
    const filtered = useMemo(() => {
      const regionFilter = cities.filter((reg) => reg?.state?.regionId === region || !region)
      return regionFilter.filter((city) => city.stateId === state || !state)
    }, [cities, state, region])
    
    const initialValue = useMemo(() => {
        return filtered.find((city) => city.id === value)
    }, [filtered, value])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        {!isAddForm && type === "form" 
          ? <ReadOnlyInputBox label='Ciudad' required defaultValue={initialValue?.name} />
          : <ComboBox
              id='cityId'
              initialValue={initialValue}                
              label='Ciudad'
              name='cityId'
              type={type}
              onChange={(_, newValue: CityPrimitives) => {
                        onChange("cityId", newValue ? newValue.id : "", Operator.EQUAL)
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
