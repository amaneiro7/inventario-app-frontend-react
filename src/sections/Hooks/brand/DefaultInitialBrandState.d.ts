
import { type BrandId } from "@/modules/devices/brand/domain/BrandId"
import { type BrandName } from "@/modules/devices/brand/domain/BrandName"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"


export interface DefaultBrandProps {
    id?: Primitives<BrandId>
    name: Primitives<BrandName>
}

export interface FormBrandErrors {
    name: string
}

export interface FormBrandDisabled {
    name: boolean
}
export interface FormBrandRequired {
    name: boolean
}