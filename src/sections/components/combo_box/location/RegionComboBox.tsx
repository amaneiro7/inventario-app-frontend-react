import { lazy, Suspense, useMemo } from "react"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type RegionId } from "../../../../modules/location/region/domain/RegionId"
import { type RegionPrimitives } from "../../../../modules/location/region/domain/region"
import { useAppContext } from "../../../Context/AppProvider"


interface Props {
    value?: Primitives<RegionId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: 'form' | 'search'
    error?: string
    disabled?: boolean
    required?: boolean
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import('../../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export function RegionComboBox({ value, onChange, type = 'search', isAddForm = false, disabled = false, error, required }: Props) {
    const { useRegion: { regions, loading }} = useAppContext()
    

    const initialValue = useMemo(() => {
        return regions.find(region => region.id === value)
    }, [regions, value])

    return (
      <Suspense>
        {!isAddForm && type === 'form'
            ? <ReadOnlyInputBox label='Región' required defaultValue={initialValue?.name} />
            : <ComboBox
                id='regionId'
                initialValue={initialValue}
                label='Región'
                name='regionId'
                type={type}
                onChange={(_, newValue: RegionPrimitives) => {
                    onChange('regionId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={regions}
                isDisabled={disabled}
                isRequired={required}
                isError={!!error}
                errorMessage={error}
                loading={loading}
              />}
      </Suspense>
    )
}