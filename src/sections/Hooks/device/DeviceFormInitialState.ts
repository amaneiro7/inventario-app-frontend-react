import { useLayoutEffect, useState, useMemo, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetDevice } from './useGetDevice'
import { type DevicesApiResponse } from '@/modules/shared/domain/types/responseTypes'
import { type DevicePrimitives } from '@/modules/devices/devices/devices/domain/Device'
import { DefaultProps } from './DefaultInitialState'

const defaultInitialState: DefaultProps = {
  id: undefined,
  serial: '',
  activo: '',
  statusId: '',
  modelId: '',
  mainCategoryId: '',
  categoryId: '',
  brandId: '',
  employeeId: '',
  locationId: '',
  typeOfSiteId: '',
  observation: '',
  stockNumber: '',
  computerName: '',
  processorId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: '',
  hardDriveTypeId: '',
  operatingSystemArqId: '',
  operatingSystemId: '',
  macAddress: '',
  ipAddress: '',
  health: 100,
  updatedAt: undefined,
  memoryRamSlotQuantity: undefined,
  memoryRamType: '',
  memoryRam: [],
  history: []
}
export const useDeviceInitialState = (): {
  preloadedDeviceState: DefaultProps
  setResetState: () => void
  isAddForm: boolean
} => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getDevice } = useGetDevice()
  const [preloadedDeviceState, setPreloadedDeviceState] = useState(defaultInitialState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const processDeviceState = useCallback((device: DevicePrimitives): void => {
    const { serial, activo, statusId, model, modelId, categoryId, brandId, employeeId, locationId, observation, stockNumber, computer, hardDrive, history, updatedAt, location: { typeOfSiteId }, category: { mainCategoryId } } = device as DevicesApiResponse
    setPreloadedDeviceState((prev) => ({ ...prev, id, serial, activo: activo ?? '', statusId, modelId, categoryId, mainCategoryId, brandId, employeeId, locationId, observation, stockNumber, history, updatedAt, typeOfSiteId: typeOfSiteId ?? '' }))
    if (computer !== null) {
      const { computerName, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress, memoryRam } = computer
      let memoryRamSlotQuantity: undefined | number
      let memoryRamType: string
      if (model?.modelComputer !== null) {
        memoryRamSlotQuantity = model?.modelComputer.memoryRamSlotQuantity
        memoryRamType = model?.modelComputer.memoryRamType.name
      } else if (model?.modelLaptop !== null) {
        memoryRamSlotQuantity = model?.modelLaptop.memoryRamSlotQuantity
        memoryRamType = model?.modelLaptop.memoryRamType.name
      } else {
        memoryRamSlotQuantity = undefined
        memoryRamType = ''
      }
      const meRam = memoryRam.length !== memoryRamSlotQuantity ? [...memoryRam, ...Array(memoryRamSlotQuantity - memoryRam.length).fill(0)] : memoryRam

      if (memoryRamCapacity > 0 && memoryRam.length !== memoryRamSlotQuantity) {
        meRam[0] = Number(memoryRamCapacity)
      }
      setPreloadedDeviceState(prev => ({ ...prev, computerName: computerName ?? '', processorId, memoryRamType, memoryRamSlotQuantity, memoryRamCapacity, memoryRam: meRam, hardDriveCapacityId, hardDriveTypeId, operatingSystemArqId, operatingSystemId, macAddress, ipAddress }))
    }
    if (hardDrive !== null) {
      const { health, hardDriveCapacityId, hardDriveTypeId } = hardDrive
      setPreloadedDeviceState(prev => ({ ...prev, health, hardDriveCapacityId, hardDriveTypeId }))
    }
  }, [id])

  const fetchDevice = useCallback(() => {
    getDevice({ id })
      .then(device => {
        processDeviceState(device)
      })
      .catch(error => {
        console.error('useDeviceInitialState', error)
      })
  }, [getDevice, id, processDeviceState])

  const setResetState = useCallback(() => {
    if (isAddForm) {
      setPreloadedDeviceState({ id: undefined, ...defaultInitialState })
    } else {
      fetchDevice()
    }
  }, [fetchDevice, isAddForm])

  useLayoutEffect(() => {
    if (isAddForm) {
      setPreloadedDeviceState(defaultInitialState)
      return
    }
    if (location.state?.state) {
      const device = location.state?.state
      processDeviceState(device)
    } else {
      if (!id) {
        navigate('/error')
        return
      }
      fetchDevice()
    }

  }, [fetchDevice, id, isAddForm, location.state?.state, navigate, processDeviceState])

  return {
    preloadedDeviceState,
    setResetState,
    isAddForm
  }
}
