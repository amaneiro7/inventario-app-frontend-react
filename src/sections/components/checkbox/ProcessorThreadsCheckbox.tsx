import { lazy } from "react";
import { type OnHandleChange } from "@/modules/shared/domain/types/types";
import { type ProcessorHasThreads } from "@/modules/devices/fetures/processor/domain/ProcessorHasThreads";
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives";
interface Props {
    value: Primitives<ProcessorHasThreads>
    onChange: OnHandleChange
    isRequired?: boolean
    isDisabled?: boolean    
}

const Checkbox = lazy(async () => import("./Checbox").then(m => ({ default: m.Checkbox })))

export function ProcessorThreadsCheckbox({ value, onChange, isDisabled, isRequired }: Props) {
    return (
      <Checkbox
        label='Tiene Threads'
        text='¿Tiene Threads?'
        name='threads'
        value={value}
        disabled={isDisabled}
        required={isRequired}
        handle={(event) => {
                    const { name, checked } = event.target
                    onChange(name, checked)
                }}
      />
    )
}