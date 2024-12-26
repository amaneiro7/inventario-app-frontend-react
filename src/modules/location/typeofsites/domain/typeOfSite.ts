import { Primitives } from "../../../shared/domain/value-object/Primitives"
import { TypeOfSiteId } from "./typeOfSiteId"

export interface TypeOfSitePrimitives {
  id: Primitives<TypeOfSiteId>
  name: string
}
