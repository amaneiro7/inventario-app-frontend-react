import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { OrderTypes } from '@/modules/shared/domain/criteria/OrderType'

export const useSearchByCriteriaQuery = (defaultQuery?: SearchByCriteriaQuery) => {
  const [query, setQuery] = useState<SearchByCriteriaQuery>(defaultQuery ?? {
    filters: [],
    limit: 25,
    offset: 0,
    orderBy: 'id',
    orderType: OrderTypes.ASC
  })


  const addFilter = useCallback((payload: SearchByCriteriaQuery) => {
    setQuery(prevQuery => {
      // Create a copy of the current query state
      const newQuery = structuredClone(prevQuery)


      if (payload?.filters?.length > 0) {
        newQuery.offset = 0
        // Extract the new filter to add from the payload
        const filterToAdd = payload?.filters[0]

        // Check if the new filter is a default filter
        const isDefaultFilter = defaultQuery ? defaultQuery?.filters?.some(df => df.field === filterToAdd.field) : false
        // Find the index of the existing filter with the same field, if any
        const filterIndex = prevQuery.filters.findIndex(filter => filter.field === filterToAdd.field)

        // If the filter is not a default filter, update or add it
        if (!isDefaultFilter) {
          if (filterIndex >= 0) {
            // Replace the existing filter if it exists
            newQuery.filters[filterIndex] = filterToAdd
          } else {
            // Add the new filter if it doesn't exist
            newQuery.filters.push(filterToAdd)
          }
        } else {

          // If the filter is a default filter, remove it if the value is empty
          newQuery.filters = newQuery.filters.filter(filter => filter.field !== filterToAdd.field)

          if (filterToAdd.value !== '') {
            // If the filter value is not empty, add it to the filters
            newQuery.filters.push(filterToAdd)
          } else {
            // If the filter value is empty, add all the default filters back
            defaultQuery?.filters.forEach((filter) => { newQuery.filters.push(filter) })
          }
        }
      }


      // Remove filters with empty values
      const filterWithoutEmptyValues = newQuery.filters.filter(filter => filter.value !== '')

      // Update limit, offset, and order if provided in the payload
      if (payload.limit) {
        newQuery.limit = payload.limit
        newQuery.offset = 0
      }
      if (payload.offset) {
        newQuery.offset = payload.offset
      }
      if (payload.orderBy) {
        newQuery.orderBy = payload.orderBy
      }
      if (payload.orderType) {
        newQuery.orderType = payload.orderType
      }

      // Update the query state with the new filters
      return { ...prevQuery, ...newQuery, filters: filterWithoutEmptyValues }
    })
  }, [defaultQuery])


  const cleanFilters = useCallback(() => {
    setQuery(prev => ({
      ...prev,
      filters: defaultQuery?.filters ?? [],
      limit: defaultQuery?.limit ?? 25,
      offset: defaultQuery?.offset ?? 0,
      orderBy: defaultQuery?.orderBy ?? 'id',
      orderType: defaultQuery?.orderType ?? OrderTypes.ASC
    }))
  }, [defaultQuery?.filters, defaultQuery?.limit, defaultQuery?.offset, defaultQuery?.orderBy, defaultQuery?.orderType])

  return {
    query,
    addFilter,
    cleanFilters
  }
}
