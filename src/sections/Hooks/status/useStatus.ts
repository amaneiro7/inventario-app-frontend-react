import { useCallback, useEffect, useState } from 'react'
import { AllStatusGetter } from '../../../modules/devices/devices/status/application/AllStatusGetter'
import { ApiStatusRepository } from '../../../modules/devices/devices/status/infraestructure/ApiStatusRepository'
import { type StatusPrimitives } from '../../../modules/devices/devices/status/domain/Status'

export interface UseStatus {
  status: StatusPrimitives[]
  loading: boolean
  error: Error | null
}

export const useStatus = (): UseStatus => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState<StatusPrimitives[]>([])

  const getStatus = useCallback(() => {
    setLoading(true)
    new AllStatusGetter(new ApiStatusRepository())
      .get()
      .then((res) => {
        setStatus(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getStatus()

    return () => {
      setStatus([])
    }
  }, [getStatus])

  return {
    status,
    loading,
    error
  }
}
