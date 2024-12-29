
import { type Source } from '@/modules/shared/domain/types/types'
import { type Device, type DevicePrimitives } from './Device'
import { type DeviceId } from './DeviceId'
import { type Criteria } from '@/modules/shared/domain/criteria/Criteria'

export abstract class DeviceRepository {
  abstract getAll(): Promise<DevicePrimitives[]>

  abstract getByCriteria(criteria: Criteria): Promise<{ total: number, data: DevicePrimitives[] }>

  abstract getById({ id }: { id: DeviceId }): Promise<DevicePrimitives>

  abstract save({ device }: { device: Device }): Promise<void>

  abstract update({ id, device }: { id: DeviceId, device: Device }): Promise<void>

  abstract download(criteria: Criteria, source: Source): Promise<void>
}
