import { useCallback } from 'react'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'

export const useCreateDevice = (): {
    createDevice: (formData: DevicePrimitives) => Promise<void>
} => {
    return {
        createDevice: useCallback(async (formData: DevicePrimitives) => {
            return await new DeviceCreator(new ApiDeviceRepository()).create(formData)
        }, [])
    }
}
