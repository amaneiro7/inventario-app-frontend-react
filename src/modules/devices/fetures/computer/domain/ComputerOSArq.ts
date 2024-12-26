import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type OperatingSystemId } from '../../operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '../../operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'

export class ComputerOsArq extends AcceptedNullValueObject<Primitives<OperatingSystemArqId>> {
  private static errors: string = ''
  constructor (
    readonly value: Primitives<OperatingSystemId>,
    private readonly operatingSystem: Primitives<OperatingSystemId>
  ) {
    super(value)
    if (!value) {
      this.value = null
    } else {
      this.value = value
    }

    if (!ComputerOsArq.isValid(this.value, this.operatingSystem)) {
      throw new Error(ComputerOsArq.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    ComputerOsArq.errors = error
  }

  private static get errorsValue (): string {
    return ComputerOsArq.errors
  }

  public static isValid (value: Primitives<ComputerOsArq>, operatingSystem: Primitives<OperatingSystemId>): boolean {
    if (!operatingSystem && value) {
      ComputerOsArq.updateError('Si el equipo no posee Sistema Operativo, no se le puede definir una arquitectura')
      return false
    }
    if (operatingSystem && !value) {
      ComputerOsArq.updateError('Si el equipo posee Sistema Operativo, la arquitectura es requerida')
      return false
    }
    return true
  }

  public static invalidMessage (): string {
    return ComputerOsArq.errorsValue
  }
}
