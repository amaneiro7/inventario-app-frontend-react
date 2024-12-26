export class HardDriveCapacityValues {
  static readonly ACCEPTED_VALUES: Record<string, string> = {
    40: '40',
    80: '80',
    120: '120',
    160: '160',
    250: '250',
    320: '320',
    500: '500',
    750: '750',
    1000: '1000',
    2000: '2000',
    4000: '4000'
  }

  constructor (readonly value: string) {
    if (!HardDriveCapacityValues.isValid(value)) {
      throw new Error(HardDriveCapacityValues.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es válido para la capacidad de unidad de disco duro`
  }
}
