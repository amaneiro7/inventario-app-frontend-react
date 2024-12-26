export class StatusName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!StatusName.isValid(value)) {
      throw new Error(StatusName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= StatusName.NAME_MIN_LENGTH && value.length <= StatusName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${StatusName.NAME_MIN_LENGTH} y ${StatusName.NAME_MAX_LENGTH} caracteres`
  }
}
