import { useCallback, useEffect, useState } from 'react'
import { type VicepresidenciaEjecutivaPrimitives } from '../../../modules/employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutiva'
import { AllVicepresidenciaEjecutivaGetter } from '../../../modules/employee/area/vicepresidenciaejecutiva/application/AllVicepresidenciaEjecutivaGetter'
import { ApiVicepresidenciaEjecutivaRepository } from '../../../modules/employee/area/vicepresidenciaejecutiva/infraestructure/ApiVicepresidenciaEjecutivaRepository'

export interface UseVicepresidenciaEjecutiva {
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaPrimitives[]
  loading: boolean
  error: string | null
}
export const useVicepresidenciaEjecutiva = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<VicepresidenciaEjecutivaPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllVicepresidenciaEjecutivaGetter(new ApiVicepresidenciaEjecutivaRepository())
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
    vicepresidenciaEjecutiva: data,
    loading,
    error
  }
}
