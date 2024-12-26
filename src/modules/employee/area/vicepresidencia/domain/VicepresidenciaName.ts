export class VicepresidenciaName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!VicepresidenciaName.isValid(value)) {
      throw new Error(VicepresidenciaName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= VicepresidenciaName.NAME_MIN_LENGTH && value.length <= VicepresidenciaName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${VicepresidenciaName.NAME_MIN_LENGTH} y ${VicepresidenciaName.NAME_MAX_LENGTH} caracteres`
  }
}
