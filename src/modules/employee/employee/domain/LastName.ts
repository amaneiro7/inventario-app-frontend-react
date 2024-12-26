export class EmployeeLastName {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 15
  static readonly regex = /^[a-zA-Z\s]*$/

  constructor (readonly value: string) {
    if (!EmployeeLastName.isValid(value)) {
      throw new Error(EmployeeLastName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return EmployeeLastName.regex.test(value) && value.length >= EmployeeLastName.NAME_MIN_LENGTH && value.length <= EmployeeLastName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    if (!EmployeeLastName.regex.test(value)) {
      return 'El Apellido debe contener solo letras'
    }
    return `El Apellido ${value} no es válido. Debe tener entre ${EmployeeLastName.NAME_MIN_LENGTH} y ${EmployeeLastName.NAME_MAX_LENGTH} caracteres`
  }
}
