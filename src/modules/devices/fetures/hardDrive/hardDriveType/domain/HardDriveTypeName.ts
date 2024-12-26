export class HardDriveTypeName {
  static readonly ACCEPTED_VALUES: Record<string, string> = {
    HDD: 'HDD',
    SDD: 'SDD',
    SDDM2: 'SDD M.2',
    IDE: 'IDE'
  }

  constructor (readonly value: string) {
    if (!HardDriveTypeName.isValid(value)) {
      throw new Error(HardDriveTypeName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es válido para el tipo de unidad de disco duro`
  }
}
