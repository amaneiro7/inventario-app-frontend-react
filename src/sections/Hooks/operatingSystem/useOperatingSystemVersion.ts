import { useCallback, useEffect, useState } from 'react'
import { type OperatingSystemPrimitives } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem'
import { AllOperatingSystemGetter } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/application/AllOperatingSystemGetter'
import { ApiOperatingSystemRepository } from '../../../modules/devices/fetures/operatingSystem/operatingSystem/infrastructure/ApiOperatingSystemRepository'
export interface UseOperatingSystemVersions {
  operatingSystem: OperatingSystemPrimitives[]
  loading: boolean
  error: string | null
}
export const useOperatingSystemVersions = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<OperatingSystemPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllOperatingSystemGetter(new ApiOperatingSystemRepository())
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchData()

    return () => {
      setData([])
    }
  }, [fetchData])

  return {
    operatingSystem: data,
    loading,
    error
  }
}
