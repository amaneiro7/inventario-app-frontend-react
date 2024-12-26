import { useCallback, useState } from 'react'
import { DeviceGetterByCriteria } from '@/modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type DevicesMappedApiResponse } from '@/modules/shared/domain/types/responseTypes'
import { ApiDeviceRepository } from '@/modules/devices/devices/devices/infraestructure/ApiDeviceRepository'


export interface UseDevice {
  devices: DevicesMappedApiResponse[]
  total: number
  loading: boolean
  error: string | null
  searchDevices: (filter: SearchByCriteriaQuery) => void
  resetDevices: () => void
}

const initialState: {
  devices: DevicesMappedApiResponse[]
  total: number
  loading: boolean
  error: string | null
} = {
  devices: [],
  total: 0,
  loading: false,
  error: null
}

export const useSearchDevice = (): UseDevice => {
  const [state, setState] = useState(initialState)

  const searchDevices = useCallback((filter: SearchByCriteriaQuery) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }))

    new DeviceGetterByCriteria(new ApiDeviceRepository())
      .get(filter)
      .then((devices) => {
        setState((prevState) => ({
          ...prevState,
          devices: devices.data as DevicesMappedApiResponse[],
          total: devices.total,
          error: null
        }))
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          // error: 'An unexpected error occurred while trying to search devices' 
          error: error.message
        }))
        console.error('searchDevices', error)
      })
      .finally(() => {
        setState((prevState) => ({ ...prevState, loading: false }))
      })
  }, [])

  const resetDevices = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    devices: state.devices,
    total: state.total,
    loading: state.loading,
    error: state.error,
    searchDevices,
    resetDevices
  }
}
