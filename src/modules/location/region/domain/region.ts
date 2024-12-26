import { Primitives } from "../../../shared/domain/value-object/Primitives"
import { RegionId } from "./RegionId"

export interface RegionPrimitives {
  id: Primitives<RegionId>
  name: string
}
