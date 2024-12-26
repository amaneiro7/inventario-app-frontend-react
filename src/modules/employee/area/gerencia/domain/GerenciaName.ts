export class GerenciaName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!GerenciaName.isValid(value)) {
      throw new Error(GerenciaName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= GerenciaName.NAME_MIN_LENGTH && value.length <= GerenciaName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El estado ${value} no es válido. Debe tener entre ${GerenciaName.NAME_MIN_LENGTH} y ${GerenciaName.NAME_MAX_LENGTH} caracteres`
  }
}
