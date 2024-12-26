import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../devices/status/domain/StatusId'

export class IPAddress {
  static readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
  private static errors: string = ''
  constructor(
    readonly value: string | null,
    private readonly status: Primitives<StatusId>

  ) {
    if (value === '' || value === undefined || value == null) {
      this.value = null
    } else {
      this.value = value
    }

    if (!IPAddress.isValid(this.value, this.status)) {
      throw new Error(IPAddress.invalidMessage())
    }
  }

  private static updateError(error: string): void {
    IPAddress.errors = error
  }

  private static get errorsValue(): string {
    return IPAddress.errors
  }

  public static isValid(value: Primitives<IPAddress>, status: Primitives<StatusId>): boolean {
    if (status === '') return true
    if (StatusId.StatusOptions.INUSE === status && !value) {
      IPAddress.updateError('Si el equipo esta en uso la dirección IP es requerida')
      return false
    }
    if ([
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PORDESINCORPORAR,
      StatusId.StatusOptions.DESINCORPORADO
    ].includes(status) && value) {
      IPAddress.updateError('Si el equipo no está en uso, no puede tener dirección IP')
      return false
    }
    if (!value) {
      IPAddress.updateError('')
      return true
    }
    const isMatch = IPAddress.IPADRRESS_VALIDATION.test(value)
    if (!isMatch) {
      IPAddress.updateError(`"${value}" no es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`)
      return false
    }
    IPAddress.updateError('')
    return true
  }

  public static invalidMessage(): string {
    return IPAddress.errorsValue
  }
}
