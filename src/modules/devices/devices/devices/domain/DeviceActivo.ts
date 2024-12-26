export class DeviceActivo {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100
  static readonly notLowerCase = /^[^a-z]*$/
  static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
  static errors: string = ''

  constructor (readonly value: string | null) {
    if (value === null || value === undefined || value === '') {
      this.value = null
    } else {
      this.value = value

      if (!DeviceActivo.isValid(this.value)) {
        throw new Error(DeviceActivo.invalidMessage())
      }
    }
  }

  private static updateError (error: string): void {
    this.errors = error
  }

  private static get errorsValue (): string {
    return this.errors
  }

  public static isValid (value: string | null): boolean {
    if (value === null || value === '') return true
    const errorMesagge: string[] = []
    const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
    if (!isHasNotSpecialCharacterOnlyGuiones) {
      errorMesagge.push(`${value}: El Serial no puede contener caracteres especiales`)
    }
    const isNotHasLowerCharacter = this.notLowerCase.test(value)
    if (!isNotHasLowerCharacter) {
      errorMesagge.push("El Serial debe estar en mayúsculas")
    }
    const isNameValidLength = value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
    if (!isNameValidLength) {
      errorMesagge.push(`El Serial debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
    }
    this.updateError(errorMesagge.join(' '))
    return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
  }

  public static invalidMessage (): string {
    return this.errorsValue
  }
}
