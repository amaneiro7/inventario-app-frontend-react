export class HardDriveHealth {
  static readonly NAME_MIN_LENGTH = 0
  static readonly NAME_MAX_LENGTH = 100

  constructor(readonly value: number) {
    if (!HardDriveHealth.isValid(value)) {
      throw new Error(HardDriveHealth.invalidMessage())
    }
  }

  public static isValid(value: number): boolean {
    return value >= HardDriveHealth.NAME_MIN_LENGTH && value <= HardDriveHealth.NAME_MAX_LENGTH
  }

  public static invalidMessage(): string {
    return `Invalid hard drive health score, must be between ${HardDriveHealth.NAME_MIN_LENGTH} and ${HardDriveHealth.NAME_MAX_LENGTH}`
  }
}
