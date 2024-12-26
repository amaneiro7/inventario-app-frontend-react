import { type EmployeeId } from "@/modules/employee/employee/domain/EmployeeId"
import { type EmployeeUserName } from "@/modules/employee/employee/domain/UserName"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

export interface DefaultEmployeeProps {
    id?: Primitives<EmployeeId>
    userName: Primitives<EmployeeUserName>
    devices?: DevicesApiResponse[]
    updatedAt?: string
}

export interface FormEmployeeErrors {
    userName: string
}

export interface FormEmployeeDisabled {
    userName: boolean
}
export interface FormEmployeeRequired {
    userName: boolean
}