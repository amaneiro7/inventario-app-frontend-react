import { useCallback, useEffect, useState } from 'react'
import { AllCargoGetter } from '../../../modules/employee/cargo/application/AllCargoGetter'
import { type CargoPrimitives } from '../../../modules/employee/cargo/domain/cargo'
import { ApiCargoRepository } from '../../../modules/employee/cargo/infraestructure/ApiCargoRepository'

export interface UseCargo {
  cargo: CargoPrimitives[]
  loading: boolean
  error: string | null
}
export const useCargo = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<CargoPrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllCargoGetter(new ApiCargoRepository())
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
    cargo: data,
    loading,
    error
  }
}
