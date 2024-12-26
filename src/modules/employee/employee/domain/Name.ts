export class EmployeeName {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 15
  static readonly regex = /^[a-zA-Z\s]*$/

  constructor (readonly value: string) {
    if (!EmployeeName.isValid(value)) {
      throw new Error(EmployeeName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return EmployeeName.regex.test(value) && value.length >= EmployeeName.NAME_MIN_LENGTH && value.length <= EmployeeName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    if (!EmployeeName.regex.test(value)) {
      return 'El nombre debe contener solo letras'
    }
    return `El nombre ${value} no es válido. Debe tener entre ${EmployeeName.NAME_MIN_LENGTH} y ${EmployeeName.NAME_MAX_LENGTH} caracteres`
  }
}
