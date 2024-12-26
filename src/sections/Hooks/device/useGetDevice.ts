import { useCallback } from 'react'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type DeviceId } from '../../../modules/devices/devices/devices/domain/DeviceId'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
export const useGetDevice = (): {
    getDevice: ({ id }: {
        id: Primitives<DeviceId>;
    }) => Promise<DevicePrimitives>
} => {
    return {
        getDevice: useCallback(async ({ id }: { id: Primitives<DeviceId> }) => {
            return await new DeviceGetter(new ApiDeviceRepository()).getById(id)
        }, [])
    }
}
