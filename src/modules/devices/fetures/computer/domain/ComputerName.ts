import { StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

export class ComputerName {
  static readonly NAME_MIN_LENGTH = 5
  static readonly NAME_MAX_LENGTH = 100
  private static errors: string = ''
  private static readonly notLowerCase = /^[^a-z]*$/
  private static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/

  constructor(
    readonly value: string,
    readonly status: Primitives<StatusId>
  ) {
    if (!value) {
      this.value = null
    } else {
      this.value = value
      if (!ComputerName.isValid(this.value, this.status)) {
        throw new Error(ComputerName.invalidMessage())
      }
    }
  }

  private static updateError(error: string): void {
    this.errors = error
  }

  private static get errorsValue(): string {
    return this.errors
  }

  public static isValid(value: Primitives<ComputerName>, status: Primitives<StatusId>): boolean {
    if ([
      StatusId.StatusOptions.INUSE,
      StatusId.StatusOptions.PRESTAMO,
      StatusId.StatusOptions.CONTIGENCIA,
      StatusId.StatusOptions.GUARDIA,
    ].includes(status)
      && !value) {
      this.updateError('El nombre de equipo no puede estar en blanco si el equipo esta en uso')
      return false
    }
    if ([
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PORDESINCORPORAR,
      StatusId.StatusOptions.DESINCORPORADO,
    ].includes(status) && value) {
      this.updateError('Si el equipo no está en uso, el nombre de equipo debe quedar en blanco')
      return false
    }
    if (!value) {
      return true
    }
    const errorMesagge: string[] = []
    const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
    if (!isHasNotSpecialCharacterOnlyGuiones) {
      errorMesagge.push('El Nombre de equipo no puede contener caracteres especiales')
    }
    const isNotHasLowerCharacter = this.notLowerCase.test(value)
    if (!isNotHasLowerCharacter) {
      errorMesagge.push("El Nombre de equipo debe estar en mayúsculas")
    }
    const isNameValidLength = value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
    if (!isNameValidLength) {
      errorMesagge.push(`El Nombre de equipo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
    }
    this.updateError(errorMesagge.join(' '))
    return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
  }

  public static invalidMessage(): string {
    return this.errorsValue
  }
}
