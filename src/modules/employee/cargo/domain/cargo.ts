import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type CargoId } from './CargoId'
import { type CargoName } from './CargoName'

export interface CargoPrimitives {
  id: Primitives<CargoId>
  name: Primitives<CargoName>
}

export class Cargo {
  constructor (
    private readonly id: CargoId,
    private readonly name: CargoName
  ) {}

  idValue (): Primitives<CargoId> {
    return this.id.value
  }

  nameValue (): Primitives<CargoName> {
    return this.name.value
  }

  toPrimitives (): CargoPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
