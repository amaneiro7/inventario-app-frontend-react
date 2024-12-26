export class CoordinacionName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!CoordinacionName.isValid(value)) {
      throw new Error(CoordinacionName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= CoordinacionName.NAME_MIN_LENGTH && value.length <= CoordinacionName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${CoordinacionName.NAME_MIN_LENGTH} y ${CoordinacionName.NAME_MAX_LENGTH} caracteres`
  }
}
