import { useCallback, useEffect, useState } from 'react'
import { type CoordinacionPrimitives } from '../../../modules/employee/area/coordinacion/domain/Coordinacion'
import { AllCoordinacionGetter } from '../../../modules/employee/area/coordinacion/application/AllCoordinacionGetter'
import { ApiCoordinacionRepository } from '../../../modules/employee/area/coordinacion/infraestructure/ApiCoordinacionRepository'

export interface UseCoordinacion {
  coordinacion: CoordinacionPrimitives[]
  loading: boolean
  error: string | null
}
export const useCoordinacion = (): UseCoordinacion => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<CoordinacionPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllCoordinacionGetter(new ApiCoordinacionRepository())
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
    coordinacion: data,
    loading,
    error
  }
}
