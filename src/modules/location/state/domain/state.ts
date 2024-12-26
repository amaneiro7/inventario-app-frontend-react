import { Primitives } from "../../../shared/domain/value-object/Primitives"
import { StateId } from "./StateId"

export interface StatePrimitives {
  id: Primitives<StateId>
  name: string
  regionId: string
}
