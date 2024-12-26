import { type DeviceId } from "../../devices/devices/devices/domain/DeviceId"
import { EmployeeId } from "../../employee/employee/domain/EmployeeId"
import { type Primitives } from "../../shared/domain/value-object/Primitives"
import { type UserId } from "../../user/user/domain/UserId"
import { type HistoryId } from "./HistoryId"

export interface HistoryPrimitives {
  id: Primitives<HistoryId>
  deviceId: Primitives<DeviceId>
  userId: Primitives<UserId>
  employeeId: Primitives<EmployeeId>
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  oldData: object
  newData: object
}
