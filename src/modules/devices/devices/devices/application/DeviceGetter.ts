import { type DevicePrimitives } from '../domain/Device'
import { DeviceId } from '../domain/DeviceId'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceGetter {
  constructor (private readonly repository: DeviceRepository) {}

  async getById (id: string): Promise<DevicePrimitives> {
    const deviceId = new DeviceId(id)
    return await this.repository.getById({ id: deviceId })
  }
}
