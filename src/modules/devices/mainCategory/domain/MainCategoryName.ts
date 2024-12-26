export class MainCategoryName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100

  constructor(readonly value: string) {
    if (!MainCategoryName.isValid(value)) {
      throw new Error(MainCategoryName.invalidMessage(value))
    }
  }

  public static isValid(value: string): boolean {
    return value.length >= MainCategoryName.NAME_MIN_LENGTH && value.length <= MainCategoryName.NAME_MAX_LENGTH
  }

  public static invalidMessage(value: string): string {
    return `El nombre ${value} no es válido. Debe tener entre ${MainCategoryName.NAME_MIN_LENGTH} y ${MainCategoryName.NAME_MAX_LENGTH} caracteres`
  }
}
