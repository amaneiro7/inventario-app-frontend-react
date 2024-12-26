export class ProcessorName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!ProcessorName.isValid(value)) {
      throw new Error(ProcessorName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= ProcessorName.NAME_MIN_LENGTH && value.length <= ProcessorName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${ProcessorName.NAME_MIN_LENGTH} y ${ProcessorName.NAME_MAX_LENGTH} caracteres`
  }
}
