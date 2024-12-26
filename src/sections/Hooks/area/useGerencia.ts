import { useCallback, useEffect, useState } from 'react'
import { type GerenciaPrimitives } from '../../../modules/employee/area/gerencia/domain/gerencia'
import { AllGerenciaGetter } from '../../../modules/employee/area/gerencia/application/AllGerenciaGetter'
import { ApiGerenciaRepository } from '../../../modules/employee/area/gerencia/infraestructure/ApiGerenciaRepository'

export interface UseGerencia {
  gerencia: GerenciaPrimitives[]
  loading: boolean
  error: string | null
}
export const useGerencia = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<GerenciaPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllGerenciaGetter(new ApiGerenciaRepository())
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
    gerencia: data,
    loading,
    error
  }
}
