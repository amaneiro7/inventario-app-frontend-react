import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { LocationGetterByCriteria } from '../../../modules/location/locations/application/LocationGetterByCriteria'
import { ApiLocationRepository } from '../../../modules/location/locations/infraestructure/ApiLocationRepository'

export interface UseLocationByCriteria {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
  searchLocationsByCriteria: (filter?: SearchByCriteriaQuery) => void
}

export const useLocationByCriteria = (): UseLocationByCriteria => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [locations, setLocations] = useState<LocationPrimitives[]>([])

  const searchLocationsByCriteria = useCallback((filter?: SearchByCriteriaQuery) => {
    setLoading(true)
    new LocationGetterByCriteria(new ApiLocationRepository())
      .get(filter)
      .then((location) => {
        setLocations(location)
      })
      .catch((error) => {
        console.error('searchLocations', error)
        setError('An unexpected error occurred while trying to search Locations')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    locations,
    loading,
    error,
    searchLocationsByCriteria
  }
}
