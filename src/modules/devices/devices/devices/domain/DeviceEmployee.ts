import { EmployeeId } from '../../../../employee/employee/domain/EmployeeId'
import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { StatusId } from '../../status/domain/StatusId'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type DeviceId } from './DeviceId'

export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
  private static errors: string = ''
  constructor(
    readonly value: Primitives<DeviceId> | null,
    private readonly status: Primitives<StatusId>
  ) {
    super(value)
    if (!value) {
      this.value = null
    } else {
      this.value = value
    }

    if (!DeviceEmployee.isValid(this.value, this.status)) {
      throw new Error(DeviceEmployee.invalidMessage())
    }
  }

  private static updateError(error: string): void {
    DeviceEmployee.errors = error
  }

  private static get errorsValue(): string {
    return DeviceEmployee.errors
  }

  public static isValid(value: Primitives<DeviceEmployee>, status: Primitives<StatusId>): boolean {
    if ([
      StatusId.StatusOptions.PRESTAMO,
      StatusId.StatusOptions.CONTINGENCIA,
      StatusId.StatusOptions.GUARDIA,
    ].includes(status) && !value) {
      DeviceEmployee.errors = 'Debe estar asignado a un usuario'
      return false
    }
    if ([
      StatusId.StatusOptions.DESINCORPORADO,
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PORDESINCORPORAR,
      StatusId.StatusOptions.DISPONIBLE,
    ].includes(status) && value) {
      DeviceEmployee.errors = 'No se le puede asignar un usuario si el estatus es ese'
      return false
    }
    if (!value) return true
    const employeeId = new EmployeeId(value)
    if (!(employeeId instanceof EmployeeId)) {
      DeviceEmployee.updateError('El id del empleado proporcionado no es válido')
      return false
    }
    return true
  }

  public static invalidMessage(): string {
    return DeviceEmployee.errorsValue
  }
}
