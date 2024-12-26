import { NumberValueObject } from '../../../shared/domain/value-object/NumberValueObject'

export class Cedula extends NumberValueObject {
  static readonly MAX = 200000000
  static readonly MIN = 1
  constructor (readonly value: number) {
    super(value)
    if (!Cedula.isValid(value)) {
      throw new Error(Cedula.invalidMessage(value))
    }
  }

  public static isValid (value: number): boolean {
    return value >= Cedula.MIN && value <= Cedula.MAX
  }

  public static invalidMessage (value: number | string): string {
    if (value === '') {
      return 'La cédula no puede estar vacía'
    }
    return `${value} no es una cédula válida`
  }
}
