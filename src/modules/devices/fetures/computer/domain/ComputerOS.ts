import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { type HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'

export class ComputerOs extends AcceptedNullValueObject<Primitives<OperatingSystemId>> {
  private static errors: string = ''
  constructor(
    readonly value: Primitives<OperatingSystemId>,
    private readonly status: Primitives<StatusId>,
    private readonly hardDriveCapacity: Primitives<HardDriveCapacityId>
  ) {
    super(value)
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value
    }

    if (!ComputerOs.isValid(this.value, this.status, this.hardDriveCapacity)) {
      throw new Error(ComputerOs.invalidMessage())
    }
  }

  private static updateError(error: string): void {
    ComputerOs.errors = error
  }

  private static get errorsValue(): string {
    return ComputerOs.errors
  }

  public static isValid(value: Primitives<ComputerOs>, status: Primitives<StatusId>, hardDriveCapacity: Primitives<HardDriveCapacityId>): boolean {
    if ([
      StatusId.StatusOptions.INUSE,
      StatusId.StatusOptions.PRESTAMO,
      StatusId.StatusOptions.CONTINGENCIA,
      StatusId.StatusOptions.GUARDIA,
    ].includes(status) && !value) {
      ComputerOs.updateError('Si el equipo está en uso, el sistema operativo es requerido')
      return false
    }
    if ([
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PORDESINCORPORAR,
      StatusId.StatusOptions.DESINCORPORADO,
    ].includes(status) && value) {
      ComputerOs.updateError('Si el equipo no está en uso, el sistema operativo no es requerido')
      return false
    }
    if (!hardDriveCapacity && value) {
      ComputerOs.updateError('El disco duro no tiene capacidad definida, por lo que no se puede asignar un Sistema Operativo')
      return false
    }
    return true
  }

  public static invalidMessage(): string {
    return ComputerOs.errorsValue
  }
}
