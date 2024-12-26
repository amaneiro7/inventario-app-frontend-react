import { lazy } from "react"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type ComputerName } from "../../../modules/devices/fetures/computer/domain/ComputerName"
import { type OperatingSystemId } from "../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId"
import { type OperatingSystemArqId } from "../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId"
import { type ProcessorName } from "../../../modules/devices/fetures/processor/domain/ProcessorName"
import { type IPAddress } from "../../../modules/devices/fetures/computer/domain/IPAddress"

const Input = lazy(async () => import("../text-inputs/Input").then(m => ({ default: m.Input })))
const OperatingSystemComboBox = lazy(() => import('../combo_box/OperatingSystemComboBox').then(m => ({ default: m.OperatingSystemComboBox })))
const OperatingSystemArqComboBox = lazy(() => import('../combo_box/OperatingSystemArqComboBox').then(m => ({ default: m.OperatingSystemArqComboBox })))

export function OtherComputerFilter ({
    handleChange,
    computerName,
    operatingSystemId,
    operatingSystemArqId,
    processor,
    ipAddress,
}: {
    handleChange: (name: string, value: string, operator?: Operator) => void
    computerName: Primitives<ComputerName>
    operatingSystemId: Primitives<OperatingSystemId>
    operatingSystemArqId: Primitives<OperatingSystemArqId>
    processor: Primitives<ProcessorName>
    ipAddress: Primitives<IPAddress>
}) {
    return (
      <>
        <Input
          value={computerName}
          name='computerName'
          type='text'
          label='Nombre del equipo'
          onChange={(event) => {
                        let { value } = event.target
                        const { name } = event.target
                        value = value.trim().toUpperCase()            
                        handleChange(name, value, Operator.CONTAINS)
                      }}
        />                  
        <OperatingSystemComboBox
          value={operatingSystemId}
          onChange={handleChange}
          type='search'
        />
        <OperatingSystemArqComboBox
          value={operatingSystemArqId}
          onChange={handleChange}
          type='search'
        />
        <Input
          value={processor}
          name='processor'
          type='text'
          label='Procesador'
          onChange={(event) => {
                                let { value } = event.target
                                const { name } = event.target
                                value = value.trim().toUpperCase()            
                                handleChange(name, value, Operator.CONTAINS)
                              }}
        />
        <Input
          value={ipAddress}
          name='ipAddress'
          type='text'
          label='Dirección IP'
          onChange={(event) => {
                                let { value } = event.target
                                const { name } = event.target
                                value = value.trim().toUpperCase()            
                                handleChange(name, value, Operator.CONTAINS)
                                }}
        />
      </>

    )
}