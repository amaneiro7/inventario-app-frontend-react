import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type Device, type DevicePrimitives } from './Device'
import { type DeviceId } from './DeviceId'

export abstract class DeviceRepository {
  abstract getAll(): Promise<DevicePrimitives[]>

  abstract getByCriteria(criteria: Criteria): Promise<{ total: number, data: DevicePrimitives[] }>

  abstract getById({ id }: { id: DeviceId }): Promise<DevicePrimitives>

  abstract save({ device }: { device: Device }): Promise<void>

  abstract update({ id, device }: { id: DeviceId, device: Device }): Promise<void>

  abstract download(criteria: Criteria): Promise<void>
}
