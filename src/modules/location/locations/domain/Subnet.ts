import { Primitives } from "../../../shared/domain/value-object/Primitives"

export class Subnet {
  static readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
  private static errors: string = ''
  constructor (
    readonly value: string | null,    

  ) {
    if (value === '' || value === undefined || value == null) {
      this.value = null
    } else {
      this.value = value
    }

    if (!Subnet.isValid(this.value)) {
      throw new Error(Subnet.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    this.errors = error
  }

  private static get errorsValue (): string {
    return this.errors
  }

  public static isValid (value: Primitives<Subnet>): boolean {    
    if (!value) {
      this.updateError('')
      return true
    }
    const isMatch = this.IPADRRESS_VALIDATION.test(value)
    if (!isMatch) {
      this.updateError(`"${value}" no es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`)
      return false
    }
    this.updateError('')
    return true
  }

  public static invalidMessage (): string {
    return this.errorsValue
  }
}
