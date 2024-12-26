import { useCallback, useEffect, useState } from 'react'
import { type HardDriveTypePrimitives } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveType'
import { AllHardDriveTypeGetter } from '../../../modules/devices/fetures/hardDrive/hardDriveType/application/AllHardDriveTypeGetter'
import { ApiHardDriveTypeRepository } from '../../../modules/devices/fetures/hardDrive/hardDriveType/infrastructure/ApiHardDriveTypeRepository'

export interface UseHardDriveType {
  hardDriveType: HardDriveTypePrimitives[]
  loading: boolean
  error: string | null
}

export const useHardDriveType = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveTypePrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllHardDriveTypeGetter(new ApiHardDriveTypeRepository())
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
    hardDriveType: data,
    loading,
    error
  }
}
