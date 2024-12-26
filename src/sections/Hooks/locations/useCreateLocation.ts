import { useCallback } from 'react'
import { type LocationPrimitives } from '../../../modules/location/locations/domain/location'
import { LocationCreator } from '../../../modules/location/locations/application/LocationCreator'
import { ApiLocationRepository } from '../../../modules/location/locations/infraestructure/ApiLocationRepository'

export const useCreateLocation = (): {
    createLocation: (formData: LocationPrimitives) => Promise<void>
} => {
    return {
        createLocation: useCallback(async (formData: LocationPrimitives) => {
            return await new LocationCreator(new ApiLocationRepository()).create(formData)
        }, [])
    }
}
