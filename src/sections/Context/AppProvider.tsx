import { createContext, useContext } from "react"
import { type UseBrand, useBrand } from "../Hooks/brand/useBrand"
import { type UseEmployee, useEmployee } from "../Hooks/employee/useEmployee"
import { type UseCategory, useCategory } from "../Hooks/category/useCategory"
import { type UseStatus, useStatus } from "../Hooks/status/useStatus"
import { type UseModel, useModel } from "../Hooks/model/useModel"
import { type UseSiteLocation, useSiteLocation } from "../Hooks/locations/useLocation"
import { type UseProcessor, useProcessor } from "../Hooks/processor/useProcessor"
import { type UseMemoryRamType, useMemoryRamType } from "../Hooks/memoryRam/useMemoryRamType"
import { type UseHardDriveCapacity, useHardDriveCapacity } from "../Hooks/hardDrive/useHardDriveCapacity"
import { type UseHardDriveType, useHardDriveType } from "../Hooks/hardDrive/useHardDriveType"
import { type UseTypeOfSite, useTypeOfSite } from "../Hooks/locations/useTypeOfSite"
import { type UseOperatingSystemVersions, useOperatingSystemVersions,  } from "../Hooks/operatingSystem/useOperatingSystemVersion"
import { type UseOperatingSystemArq, useOperatingSystemArq } from "../Hooks/operatingSystem/useOperatingSystemArq"
import { type UseInputType, useInputType } from "../Hooks/inputType/useInputType"
import { type UseRegion, useRegion } from "../Hooks/locations/useRegion"
import { type UseCities, useCity } from "../Hooks/locations/useCity"
import { type UseStates,useCountryStates } from "../Hooks/locations/useCountryStates"
import { type UseSites, useSite } from "../Hooks/locations/site/useSite"
import { type UseMainCategory, useMainCategory } from "../Hooks/mainCategory/useMainCategory"

export interface AppContextState {
    useCategory: UseCategory
    useMainCategory: UseMainCategory
    useStatus: UseStatus
    useBrand: UseBrand
    useModel: UseModel
    useEmployee: UseEmployee
    useSiteLocation: UseSiteLocation
    useProcessor: UseProcessor,
    useMemoryRamType: UseMemoryRamType
    useHardDriveCapacity: UseHardDriveCapacity
    useHardDriveType: UseHardDriveType
    useTypeOfSite: UseTypeOfSite
    useOperatingSystemVersions: UseOperatingSystemVersions
    useOperatingSystemArq: UseOperatingSystemArq
    useInputType: UseInputType
    useRegion: UseRegion
    useCity: UseCities
    useCountryStates: UseStates,
    useSite: UseSites
}

export const AppContext = createContext({} as AppContextState)

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
    return (
      <AppContext.Provider value={{
            useCategory: useCategory(),
            useMainCategory: useMainCategory(),
            useStatus: useStatus(),
            useBrand: useBrand(),
            useModel: useModel(),
            useEmployee: useEmployee(),
            useSiteLocation: useSiteLocation(),
            useProcessor: useProcessor(),
            useMemoryRamType: useMemoryRamType(),
            useHardDriveCapacity: useHardDriveCapacity(),
            useHardDriveType: useHardDriveType(),
            useTypeOfSite: useTypeOfSite(),
            useOperatingSystemVersions: useOperatingSystemVersions(),
            useOperatingSystemArq: useOperatingSystemArq(),
            useInputType: useInputType(),
            useRegion: useRegion(),
            useCity: useCity(),
            useCountryStates: useCountryStates(),
            useSite: useSite()
        }}
      >
        {children}
      </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppConextProvider')
    }
    return context
}