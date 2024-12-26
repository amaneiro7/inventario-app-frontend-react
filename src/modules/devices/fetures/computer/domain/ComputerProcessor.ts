import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { type OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type ProcessorId } from '../../processor/domain/ProcessorId'

export class ComputerProcessor extends AcceptedNullValueObject<Primitives<ProcessorId>> {
  private static errors: string = ''
  constructor(
    readonly value: Primitives<OperatingSystemId>,
    private readonly status: Primitives<StatusId>
  ) {
    super(value)
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value
    }

    if (!ComputerProcessor.isValid(this.value, this.status)) {
      throw new Error(ComputerProcessor.invalidMessage())
    }
  }

  private static updateError(error: string): void {
    ComputerProcessor.errors = error
  }

  private static get errorsValue(): string {
    return ComputerProcessor.errors
  }

  public static isValid(value: Primitives<ComputerProcessor>, status: Primitives<StatusId>): boolean {
    if ([
      StatusId.StatusOptions.INUSE,
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PRESTAMO,
      StatusId.StatusOptions.GUARDIA,
      StatusId.StatusOptions.CONTINGENCIA
    ].includes(status) && !value) {
      ComputerProcessor.updateError('Si esta en uso o en almacém, el procesador es requerido')
      return false
    }
    return true
  }

  public static invalidMessage(): string {
    return ComputerProcessor.errorsValue
  }
}
