export class CargoName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!CargoName.isValid(value)) {
      throw new Error(CargoName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= CargoName.NAME_MIN_LENGTH && value.length <= CargoName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${CargoName.NAME_MIN_LENGTH} y ${CargoName.NAME_MAX_LENGTH} caracteres`
  }
}
