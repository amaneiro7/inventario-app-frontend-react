import { lazy, memo, Suspense } from "react"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { type DeviceSerial } from "@/modules/devices/devices/devices/domain/DeviceSerial"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"

interface Props {
  value: Primitives<DeviceSerial>
  onChange: OnHandleChange
  type?: "form" | "search"
  isAdd?: boolean
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

const Input = lazy(async () => import("./Input").then((m) => ({ default: m.Input })))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then((m) => ({ default: m.ReadOnlyInputBox })))

function SerialInput({ value, error, isDisabled, isRequired, onChange, type = "search", isAdd = false }: Props) {
  if (!isAdd && type === "form" ) {
    return (
      <Suspense>
        <ReadOnlyInputBox 
          label='Serial' 
          defaultValue={value ?? 'Sin Serial'} 
          required={isRequired} 
        />
      </Suspense>
    )
  } else {
    return (
      <Suspense>
        <Input
          id='serial'
          isRequired={isRequired}
          disabled={isDisabled}
          name='serial'
          type='text'
          label='Serial'
          onChange={(event) => {
                // eslint-disable-next-line prefer-const
                let { name, value } = event.target
                value = value.trim().toUpperCase()            
                onChange(name, value, Operator.CONTAINS)
              }}
          value={value}
          error={!!error}
          errorMessage={error}
        />
      </Suspense>
    )
  }
}

export default memo(SerialInput)