export class EmployeeUserName {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 15
  static readonly regex = /^[a-zA-Z\s]*$/

  constructor (readonly value: string) {
    if (!EmployeeUserName.isValid(value)) {
      throw new Error(EmployeeUserName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return EmployeeUserName.regex.test(value) && value.length >= EmployeeUserName.NAME_MIN_LENGTH && value.length <= EmployeeUserName.NAME_MAX_LENGTH
  }

  public static invalidMessage (value: string): string {
    if (!EmployeeUserName.regex.test(value)) {
      return 'El userName debe contener solo letras'
    }
    return `El usuario ${value} no es válido. Debe tener entre ${EmployeeUserName.NAME_MIN_LENGTH} y ${EmployeeUserName.NAME_MAX_LENGTH} caracteres`
  }
}

// export class EmployeeUserName {
//   static readonly NAME_MIN_LENGTH = 3
//   static readonly NAME_MAX_LENGTH = 15
//   static readonly regex = /^[a-zA-Z\s]*$/

//   constructor (
//     readonly value: string,
//     readonly firstName: string,
//     readonly lastName: string
//   ) {
//     if (!EmployeeUserName.isValid(value, firstName, lastName)) {
//       throw new Error(EmployeeUserName.invalidMessage(value, firstName, lastName))
//     }
//   }

//   public static isValid (value: string, firstName: string, lastName: string): boolean {
//     const firstLetter = firstName.charAt(0).toUpperCase()
//     const isFirstLetterMatch = firstLetter === value.charAt(0).toUpperCase()
//     const isLastNameIncluded = value.toLowerCase()?.includes(lastName.toLowerCase()) ?? false
//     return EmployeeUserName.regex.test(value) && value.length >= EmployeeUserName.NAME_MIN_LENGTH && value.length <= EmployeeUserName.NAME_MAX_LENGTH && isFirstLetterMatch && isLastNameIncluded
//   }

//   public static invalidMessage (value: string, firstName: string, lastName: string): string {
//     if (!EmployeeUserName.regex.test(value)) {
//       return 'El userName debe contener solo letras'
//     }
//     if (!value.includes(lastName)) {
//       return 'el apellido debe coincidir con el usuario'
//     }
//     const firstLetter = firstName.charAt(0).toUpperCase()
//     if (firstLetter !== value.charAt(0).toUpperCase()) {
//       return 'El usuario debe comenzar con la primera letra del nombre'
//     }
//     return `El usuario ${value} no es válido. Debe tener entre ${EmployeeUserName.NAME_MIN_LENGTH} y ${EmployeeUserName.NAME_MAX_LENGTH} caracteres`
//   }
// }
