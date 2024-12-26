export class CategoryName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor (readonly value: string) {
    if (!CategoryName.isValid(value)) {
      throw new Error(CategoryName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return value.length >= CategoryName.NAME_MIN_LENGTH && value.length <= CategoryName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${CategoryName.NAME_MIN_LENGTH} y ${CategoryName.NAME_MAX_LENGTH} caracteres`
  }
}
