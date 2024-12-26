import { useCallback, useEffect, useMemo, useState } from 'react'
import { type LocationPrimitives } from '@/modules/location/locations/domain/location'
import { AllLocationGetter } from '@/modules/location/locations/application/AllLocationGetter'
import { ApiLocationRepository } from '@/modules/location/locations/infraestructure/ApiLocationRepository'
import { LocationCreator } from '@/modules/location/locations/application/LocationCreator'
import { LocationGetter } from '@/modules/location/locations/application/LocationGetter'

export interface UseSiteLocation {
  locations: LocationPrimitives[]
  loading: boolean
  error: string | null
  createLocation: (FormData: LocationPrimitives) => Promise<void>
  getLocation: LocationGetter
}

export const useSiteLocation = (): UseSiteLocation => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locations, setLocation] = useState<LocationPrimitives[]>([])

  const repository = useMemo(() => { return new ApiLocationRepository() }, [])
  const getLocation = useMemo(() => { return new LocationGetter(repository) }, [repository])

  const getLocations = useCallback(() => {
    setLoading(true)
    new AllLocationGetter(repository)
      .get()
      .then((res) => {
        setLocation(res)
      })
      .catch((error) => {
        setError(error)
      }).
      finally(() => {
        setLoading(false)
      })
  }, [repository])
  
  const createLocation = useCallback(async (formData: LocationPrimitives) => {
    const data = await new LocationCreator(repository).create(formData)
    getLocations()
    return data
  }, [getLocations, repository])



  useEffect(() => {
    getLocations()

    return () => {
      setLocation([])
    }
  }, [getLocations])

  return {
    locations,
    loading,
    error,
    createLocation,
    getLocation
  }
}
