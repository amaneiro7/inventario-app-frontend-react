import { useCallback, useEffect, useState } from 'react'
import { type VicepresidenciaPrimitives } from '../../../modules/employee/area/vicepresidencia/domain/Vicepresidencia'
import { AllVicepresidenciaGetter } from '../../../modules/employee/area/vicepresidencia/application/AllVicepresidenciaGetter'
import { ApiVicepresidenciaRepository } from '../../../modules/employee/area/vicepresidencia/infraestructure/ApiVicepresidenciaRepository'

export interface UseVicepresidencia {
  vicepresidencia: VicepresidenciaPrimitives[]
  loading: boolean
  error: string | null
}
export const useVicepresidencia = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<VicepresidenciaPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllVicepresidenciaGetter(new ApiVicepresidenciaRepository())
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
    vicepresidencia: data,
    loading,
    error
  }
}
