export class VicepresidenciaEjecutivaName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!VicepresidenciaEjecutivaName.isValid(value)) {
      throw new Error(VicepresidenciaEjecutivaName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= VicepresidenciaEjecutivaName.NAME_MIN_LENGTH && value.length <= VicepresidenciaEjecutivaName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${VicepresidenciaEjecutivaName.NAME_MIN_LENGTH} y ${VicepresidenciaEjecutivaName.NAME_MAX_LENGTH} caracteres`
  }
}
