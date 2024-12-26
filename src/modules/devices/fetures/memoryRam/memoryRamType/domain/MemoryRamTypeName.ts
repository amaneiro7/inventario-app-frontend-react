export class MemoryRamTypeName {
  static readonly ACCEPTED_VALUES: Record<string, string> = {
    DDR2: 'DDR2',
    DDR2L: 'DDR2L',
    DDR3: 'DDR3',
    DD3L: 'DD3L',
    DDR4: 'DDR4',
    DDR4L: 'DDR4L',
    DDR5: 'DDR5',
    DDR5L: 'DDR5L'
  }

  constructor (readonly value: string) {
    if (!MemoryRamTypeName.isValid(value)) {
      throw new Error(MemoryRamTypeName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return Object.values(MemoryRamTypeName.ACCEPTED_VALUES).includes(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es un tipo de memoria RAM válido`
  }
}
