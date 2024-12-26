import { useCallback, useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'

export interface UseDevice {
  devices: DevicePrimitives[]
  total: number
  loading: boolean
  error: string | null
  query: SearchByCriteriaQuery
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
  searchDevices: (filter: SearchByCriteriaQuery) => void
}

export const useDevice = (defaultQuery?: SearchByCriteriaQuery): UseDevice => {
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])
  const [total, setTotal] = useState(0)

  const searchDevices = useCallback((filter: SearchByCriteriaQuery) => {
    setLoading(true)
    new DeviceGetterByCriteria(new ApiDeviceRepository())
      .get(filter)
      .then((devices) => {
        setDevices(devices.data)
        setTotal(devices.total)
      })
      .catch((error) => {
        console.error('searchDevices', error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    searchDevices(query)
    return () => {
      setDevices([])
    }
  }, [query, searchDevices])

  return {
    devices,
    total,
    loading,
    error,
    query,
    addFilter,
    cleanFilters,
    searchDevices
  }
}
