export class DeviceObservation {
  static readonly NAME_MIN_LENGTH = 0
  static readonly NAME_MAX_LENGTH = 1000

  constructor (readonly value: string | null | undefined) {
    if (value === null || value === undefined || value === '') {
      this.value = ''
    } else {
      this.value = value
    }
  }
}
