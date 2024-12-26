import { useCallback, useEffect, useState } from 'react'
import { AllOperatingSystemArqGetter } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/application/AllOperatingSystemArqGetter'
import { type OperatingSystemArqPrimitives } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq'
import { ApiOperatingSystemArqRepository } from '../../../modules/devices/fetures/operatingSystem/operatingSystemArq/infrastructure/ApiOperatingSystemArqRepository'
export interface UseOperatingSystemArq {
  operatingSystemArq: OperatingSystemArqPrimitives[]
  loading: boolean
  error: string | null
}
export const useOperatingSystemArq = (): UseOperatingSystemArq => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<OperatingSystemArqPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllOperatingSystemArqGetter(new ApiOperatingSystemArqRepository())
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
    operatingSystemArq: data,
    loading,
    error
  }
}
