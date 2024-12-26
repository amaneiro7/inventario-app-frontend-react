import { useCallback, useEffect, useState } from 'react'
import { AllTypeOfSiteGetter } from '../../../modules/location/typeofsites/application/AllTypeOfSiteGetter'
import { TypeOfSitePrimitives } from '../../../modules/location/typeofsites/domain/typeOfSite'
import { ApiTypeOfSiteRepository } from '../../../modules/location/typeofsites/infraestructure/ApiTypeOfSiteRepository'

export interface UseTypeOfSite {
  typeOfSite: TypeOfSitePrimitives[]
  loading: boolean
  error: Error | null
}

export const useTypeOfSite = (): UseTypeOfSite => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [typeOfSite, setTypeOfSite] = useState<TypeOfSitePrimitives[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllTypeOfSiteGetter(new ApiTypeOfSiteRepository())
      .get()
      .then((res) => {
        setTypeOfSite(res)
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
      setTypeOfSite([])
    }
  }, [fetchData])

  return {
    typeOfSite,
    loading,
    error
  }
}
