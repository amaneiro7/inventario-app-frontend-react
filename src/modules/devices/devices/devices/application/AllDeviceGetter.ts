import { type DevicePrimitives } from '../domain/Device'
import { DeviceRepository } from '../domain/DeviceRepository'

export class AllDeviceGetter {
  constructor (private readonly repository: DeviceRepository) {}
  async get (): Promise<DevicePrimitives[]> {
    return await this.repository.getAll()
  }
}
