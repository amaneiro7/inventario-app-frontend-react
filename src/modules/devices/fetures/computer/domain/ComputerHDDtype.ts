import { AcceptedNullValueObject } from '../../../../shared/domain/value-object/AcceptedNullValueObjects'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type HardDriveCapacityId } from '../../hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '../../hardDrive/hardDriveType/domain/HardDriveTypeId'

export class ComputerHDDType extends AcceptedNullValueObject<Primitives<HardDriveTypeId>> {
  private static errors: string = ''
  constructor (
    readonly value: Primitives<HardDriveTypeId>,
    private readonly hardDriveCapacity: Primitives<HardDriveCapacityId>
  ) {
    super(value)
    if (!value) {
      this.value = null
    } else {
      this.value = value
    }

    if (!ComputerHDDType.isValid(this.value, this.hardDriveCapacity)) {
      throw new Error(ComputerHDDType.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    ComputerHDDType.errors = error
  }

  private static get errorsValue (): string {
    return ComputerHDDType.errors
  }

  public static isValid (value: Primitives<ComputerHDDType>, hardDriveCapacity: Primitives<HardDriveCapacityId>): boolean {
    if (!hardDriveCapacity && value) {
      ComputerHDDType.updateError('Si no tiene Disco duro, no se puede especificar un tipo')
      return false
    }
    return true
  }

  public static invalidMessage (): string {
    return ComputerHDDType.errorsValue
  }
}
