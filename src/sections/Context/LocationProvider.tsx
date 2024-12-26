import { createContext, useContext, useEffect } from "react"
import { type SearchByCriteriaQuery } from "../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { useLocationByCriteria } from "../Hooks/locations/useLocationByCriteria"
import { type LocationPrimitives } from "../../modules/location/locations/domain/location"
import { useCreateLocation } from "../Hooks/locations/useCreateLocation"

export interface LocationContextState {
    locations: LocationPrimitives[]
    error: string
    loading: boolean
    createLocation: (formData: LocationPrimitives) => Promise<void>    
    addFilter: (payload: SearchByCriteriaQuery) => void
    cleanFilters: () => void
    query: SearchByCriteriaQuery
}

export const LocationContext = createContext({} as LocationContextState)

export const LocationContextProvider = ({ children }: React.PropsWithChildren) => {
    const { locations, loading, error, searchLocationsByCriteria } = useLocationByCriteria()
    const { addFilter, cleanFilters, query } = useSearchByCriteriaQuery()
    const { createLocation } = useCreateLocation()

    const handleCreate = async (formData: LocationPrimitives) => {
      const res = await createLocation(formData)
      searchLocationsByCriteria(query)
      return res
    }

  useEffect(() => {
    searchLocationsByCriteria(query)
  }, [query, searchLocationsByCriteria])

        return(
          <LocationContext.Provider value={{
              locations,
              error,
              loading,
              createLocation: handleCreate,
              addFilter,
              cleanFilters, 
              query,
            }}
          >
            {children}
          </LocationContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLocationContext = () => {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error("useLocationContext must be used within a LocationContextProvider")
    }
    return context
}