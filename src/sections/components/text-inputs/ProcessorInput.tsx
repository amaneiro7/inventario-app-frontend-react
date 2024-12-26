import { lazy } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"


interface Props {
  value: string
  onChange: OnHandleChange
}

const FormInput = lazy(async () => import("./FormInput").then((m) => ({ default: m.FormInput })))

export function ProcessorInput({ value, onChange }: Props) {  
  return (    
    <FormInput
      id='ProcessorInput'
      name='processor'
      type='text'
      label='Procesador'
      placeholder='Busque por procesador'
      handle={(event) => {
            // eslint-disable-next-line prefer-const
            let { name, value } = event.target
            value = value.trim().toUpperCase()            
            onChange(name, value, Operator.CONTAINS)
          }}
      value={value}
    />
  )
}
