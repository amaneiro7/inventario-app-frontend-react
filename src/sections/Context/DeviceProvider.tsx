import { createContext,  useContext, useEffect, useMemo, useRef } from "react"
import { useSearchDevice } from "../Hooks/device/useSearchDevice"
import { useCreateDevice } from "../Hooks/device/useCreateDevices"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { MainCategoryList } from "@/modules/devices/mainCategory/domain/MainCategoryList"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { useEffectAfterMount } from "../Hooks/useEffectAfterMount"
import { useHandlePage } from "../Hooks/useHandlePage"

import { type SearchByCriteriaQuery } from "@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type DevicePrimitives } from "@/modules/devices/devices/devices/domain/Device"

export interface DeviceContextState {
  devices: DevicePrimitives[]
  total: number
  error: string
  loading: boolean
  createDevice: (formData: DevicePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: () => void
  query: SearchByCriteriaQuery
  defaultCategoryQuery: SearchByCriteriaQuery
  defaultMainCategory: typeof MainCategoryList[keyof typeof MainCategoryList]
  managePage: ReturnType<typeof useHandlePage>
}

export type LocationProps = 'computer' | 'monitor' | 'printer' | 'finantialPrinter' | 'parts'

type Computer = typeof MainCategoryList['COMPUTER']
type Monitor = typeof MainCategoryList['SCREENS']
type Parts = typeof MainCategoryList['PARTS']
type Printer = typeof MainCategoryList['PRINTERS']
type FinantialPrinter = typeof MainCategoryList['FINANTIALPRINTERS']

export const DeviceContext = createContext({} as DeviceContextState)

export const DeviceContextProvider = ({ children, location }: React.PropsWithChildren<{ location?: LocationProps }>) => {
  // Keep track of the previous location in order to determine if the location has changed.
  // This is necessary because the location is used to determine the default main category
  // and we don't want to accidentally reset the filter when the location changes.
  const previusLocation = useRef(location)
  
  // Create an object with the different main categories as properties.
  // This is necessary because we need to dynamically determine the default main category
  // based on the location.
  const list: {
    computer: Computer
    monitor: Monitor
    parts: Parts
    printer: Printer
    finantialPrinter: FinantialPrinter
  } = useMemo(() => {
    return {
      computer: MainCategoryList.COMPUTER,
      monitor: MainCategoryList.SCREENS,
      parts: MainCategoryList.PARTS,
      printer: MainCategoryList.PRINTERS,
      finantialPrinter: MainCategoryList.FINANTIALPRINTERS
    }
  }, [])

  // Determine the default main category based on the location.
  // This is necessary because we need to dynamically determine the default main category
  // based on the location.
  const defaultMainCategory = useMemo(() => {
    return list[location]
  }, [list, location])


  // Create a default query for the category based on the default main category.
  // This is necessary because we need to search for devices based on the default main category
  // when the component is mounted or when the query changes.
  const defaultCategoryQuery: SearchByCriteriaQuery = useMemo(() => { 
    return {
      filters: [{ field: 'mainCategoryId', operator: Operator.EQUAL, value: defaultMainCategory }],
      limit: 25,
      offset: 0
    }
  }, [defaultMainCategory])

  // Get the devices, total number of devices, error, and loading state from the useSearchDevice hook.
  // This is necessary because we need to search for devices based on the query when the component is mounted
  // or when the query changes.
  const { devices, total, error, loading, searchDevices, resetDevices } = useSearchDevice()
  
  // Get the addFilter, cleanFilters, and query from the useSearchByCriteriaQuery hook.
  // This is necessary because we need to be able to add filters and clean filters when the user interacts with
  // the search form.
  const { addFilter, cleanFilters, query } = useSearchByCriteriaQuery(defaultCategoryQuery)
  
  // Get the createDevice function from the useCreateDevice hook.
  // This is necessary because we need to be able to create a new device when the user submits the form.
  const { createDevice } = useCreateDevice()
  
  // Handle the creation of a new device.
  // This is necessary because we need to be able to create a new device when the user submits the form.
  const handleCreate = async (formData: DevicePrimitives) => {
    const res = await createDevice(formData) // Create the device.
    searchDevices(query) // Search for devices based on the current query.
    return res // Return the response.
  }
  
  const managePage = useHandlePage({
    addFilter,
    limit: query.limit,
    offset: query.offset,
    total
  })


  // Handle the change in location.
  // This is necessary because we need to reset the filter when the location changes.
  useEffectAfterMount(() => {
    if (location === undefined || previusLocation.current === null) return
    if (previusLocation.current !== location) {
      resetDevices()
      cleanFilters()
      previusLocation.current = location ?? previusLocation.current
    }
  }, [location])

  // Search for devices based on the query when the component is mounted or when the query changes.
  useEffect(() => {
    searchDevices(query)
    return () => {
      resetDevices()
    }
  }, [query, resetDevices, searchDevices])

  return (
    <DeviceContext.Provider value={{
      devices,
      total,
      error,
      loading,
      createDevice: handleCreate,
      addFilter,
      cleanFilters,
      query,
      defaultMainCategory,
      defaultCategoryQuery,
      managePage
    }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDeviceContext = () => {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error("useDeviceContext must be used within a DeviceContextProvider")
  }
  return context
}