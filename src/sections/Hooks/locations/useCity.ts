import { useCallback, useEffect, useState } from 'react'
import { AllCityGetter } from '../../../modules/location/city/application/AllCityGetter'
import { ApiCityRepository } from '../../../modules/location/city/infraestructure/ApiCityRepository'
import { CityApiResponse } from '../../../modules/shared/domain/types/responseTypes'

export interface UseCities {
  cities: CityApiResponse[]
  loading: boolean
  error: Error | null
}

export const useCity = (): UseCities => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState<CityApiResponse[]>([])

  const fetchData = useCallback(() => {
    setLoading(true)
    new AllCityGetter(new ApiCityRepository())
      .get()
      .then((res) => {
        setCities(res as unknown as CityApiResponse[])
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchData()

    return () => {
      setCities([])
    }
  }, [fetchData])

  return {
    cities,
    loading,
    error
  }
}
