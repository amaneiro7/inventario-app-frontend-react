import { lazy, Suspense, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type InputTypePrimitives } from "@/modules/devices/model/InputType/domain/InputType"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
    error?: string
    disabled?: boolean
    required?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

export function InputTypeComboBox({ value, onChange, type = 'search', disabled, error, required }: Props) {
    const { useInputType: { inputType, loading }} = useAppContext()

    const initialValue = useMemo(() => {
        return inputType.find(input => input.id === value)
    }, [inputType, value])

    return (
      <Suspense>
        <ComboBox
          id='inputTypeId'
          initialValue={initialValue}
          label='Tipo de Entrada'
          name='inputTypeId'
          type={type}
          onChange={(_, newValue: InputTypePrimitives) => {
                    onChange('inputTypeId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
          options={inputType}
          isDisabled={disabled}
          isRequired={required}
          isError={!!error}
          errorMessage={error}
          loading={loading}
        />
      </Suspense>
    )
}