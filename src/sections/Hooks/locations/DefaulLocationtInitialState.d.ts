import { type CityId } from "@/modules/location/city/domain/CityId"
import { type LocationId } from "@/modules/location/locations/domain/locationId"
import { type LocationName } from "@/modules/location/locations/domain/LocationName"
import { type Subnet } from "@/modules/location/locations/domain/Subnet"
import { type RegionId } from "@/modules/location/region/domain/RegionId"
import { type SiteId } from "@/modules/location/site/domain/SiteId"
import { type StateId } from "@/modules/location/state/domain/StateId"
import { type TypeOfSiteId } from "@/modules/location/typeofsites/domain/typeOfSiteId"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

export interface DefaultLocationProps {
    id?: Primitives<LocationId>
    typeOfSiteId: Primitives<TypeOfSiteId>
    regionId: Primitives<RegionId>
    stateId: Primitives<StateId>
    cityId: Primitives<CityId>
    siteId: Primitives<SiteId>
    siteName?: string
    codeAgency?: number
    name: Primitives<LocationName>
    subnet: Primitives<Subnet>
    updatedAt?: string
}

export interface FormLocationErrors {
    typeOfSiteId: string
    regionId: string
    stateId: string
    cityId: string
    siteId: string
    siteName: string
    codeAgency?: string
    name: string
    subnet: string
}

export interface FormLocationDisabled {
    typeOfSiteId: boolean
    regionId: boolean
    stateId: boolean
    cityId: boolean
    siteId: boolean
    siteName: boolean
    codeAgency?: boolean
    name: boolean
    subnet: boolean
}
export interface FormLocationRequired {
    typeOfSiteId: boolean
    regionId: boolean
    stateId: boolean
    cityId: boolean
    siteId: boolean
    siteName: boolean
    codeAgency?: boolean
    name: boolean
    subnet: boolean
}