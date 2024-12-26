import { useCallback, useEffect, useState } from 'react'
import { AllHardDriveCapacityGetter } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/application/AllHardDriveCapacityGetter'
import { ApiHardDriveCapacityRepository } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/infrastructure/ApiHardDriveCapacityRepository'
import { type HardDriveCapacityPrimitives } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacity'


export interface UseHardDriveCapacity {
  hardDriveCapacity: HardDriveCapacityPrimitives[]
  loading: boolean
  error: null | string
}

export const useHardDriveCapacity = (): UseHardDriveCapacity => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveCapacityPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllHardDriveCapacityGetter(new ApiHardDriveCapacityRepository())
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
    hardDriveCapacity: data,
    loading,
    error
  }
}
