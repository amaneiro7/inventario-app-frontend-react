export class OperatingSystemArqName {
  static readonly ACCEPTED_VALUES: Record<string, string> = {
    x86: 'x86',
    x64: 'x64'
  }

  constructor (readonly value: string) {
    if (!OperatingSystemArqName.isValid(value)) {
      throw new Error(OperatingSystemArqName.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }

  public static invalidMessage (value: string): string {
    return `${value} no es una arquitectura válida. Debe estar entre ${this.ACCEPTED_VALUES[0]} y ${this.ACCEPTED_VALUES[1]} `
  }
}
