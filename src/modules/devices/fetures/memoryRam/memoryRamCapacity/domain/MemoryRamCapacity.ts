import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { StatusId } from '../../../../devices/status/domain/StatusId'

export class MemoryRamCapacity {
  static readonly minStep = 0.5
  static readonly min = 0
  static readonly max = 32 * this.minStep
  private static errors: string = ''

  constructor (
    readonly value: number,
    private readonly status: Primitives<StatusId>

  ) {
    if (!MemoryRamCapacity.isValid(this.value, this.status)) {
      throw new Error(MemoryRamCapacity.invalidMessage())
    }
  }

  private static updateError (error: string): void {
    MemoryRamCapacity.errors = error
  }

  private static get errorsValue (): string {
    return MemoryRamCapacity.errors
  }

  public static isValid (value: Primitives<MemoryRamCapacity>, status: Primitives<StatusId>): boolean {
    const numberValue = Number(value)
    
    if (StatusId.StatusOptions.INUSE === status && numberValue === 0) {
      MemoryRamCapacity.updateError('La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso')
      return false
    }
    if ((numberValue % this.minStep) === 0) {
      return true
    } else {
      MemoryRamCapacity.updateError('Capacidad de Memoria Ram no válida')
      return false
    }
  }

  public static invalidMessage (): string {
    return MemoryRamCapacity.errorsValue
  }
}
