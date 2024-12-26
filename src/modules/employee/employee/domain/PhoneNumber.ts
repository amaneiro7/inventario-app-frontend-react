import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject'

export class PhoneNumber extends StringValueObject {
  static readonly areaCodes = [
    '0414',
    '0424',
    '0412',
    '0416',
    '0426'
  ]

  static readonly numberLenght = 7
  static readonly extension = `^(${this.areaCodes.join('|')})\\d{${this.numberLenght}}$`
  static readonly phoneRegex = new RegExp(this.extension)

  constructor (readonly value: string) {
    super(value)
    if (!PhoneNumber.isValid(value)) {
      throw new Error(PhoneNumber.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return PhoneNumber.phoneRegex.test(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es un número de teléfono válido`
  }
}
