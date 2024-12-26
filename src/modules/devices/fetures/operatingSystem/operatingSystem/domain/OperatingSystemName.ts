export class OperatingSystemName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!OperatingSystemName.isValid(value)) {
      throw new Error(OperatingSystemName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= OperatingSystemName.NAME_MIN_LENGTH && value.length <= OperatingSystemName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${OperatingSystemName.NAME_MIN_LENGTH} y ${OperatingSystemName.NAME_MAX_LENGTH} caracteres`
  }
}
