export class ModelName {
  static readonly NAME_MIN_LENGTH = 2
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!ModelName.isValid(value)) {
      throw new Error(ModelName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= ModelName.NAME_MIN_LENGTH && value.length <= ModelName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre del modelo ${value} no es válido. Debe tener entre ${ModelName.NAME_MIN_LENGTH} y ${ModelName.NAME_MAX_LENGTH} caracteres`
  }
}
