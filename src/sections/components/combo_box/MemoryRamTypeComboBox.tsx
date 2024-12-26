import { lazy, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { type MemoryRamTypePrimitives } from "@/modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamType"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
    disabled?: boolean
    required?: boolean
    error?: string
}

const ComboBox = lazy(async () => import("./combo_box"))

export function MemoryRamTypeComboBox({ value, onChange, type = 'search', error, disabled, required }: Props) {
    const { useMemoryRamType: { memoryRamTypes, loading } } = useAppContext()

    const initialValue = useMemo(() => {
        return memoryRamTypes.find(type => type.id === value)
    }, [memoryRamTypes, value])

    return (
      <>
        <ComboBox
          id='memoryRamTypeId'
          initialValue={initialValue}
          label='Tipo de Memoria'
          name='memoryRamTypeId'
          type={type}
          onChange={(_, newValue: MemoryRamTypePrimitives) => {
                    onChange('memoryRamTypeId', newValue ? newValue.id : '')
                }}
          options={memoryRamTypes}
          loading={loading}
          isDisabled={disabled}
          isRequired={required}
          isError={!!error}
          errorMessage={error}
        />
      </>
    )
}