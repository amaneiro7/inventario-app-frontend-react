import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject'

export class Extension extends StringValueObject {
  static readonly areaCodes = [
    '0261',
    '0212'
  ]

  static readonly numberLenght = 7
  static readonly extension = `^(${this.areaCodes.join('|')})\\d{${this.numberLenght}}$`
  static readonly phoneRegex = new RegExp(this.extension)

  constructor (readonly value: string) {
    super(value)
    if (!Extension.isValid(value)) {
      throw new Error(Extension.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return Extension.phoneRegex.test(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es un número de teléfono válido`
  }
}
