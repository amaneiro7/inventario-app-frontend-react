import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaId } from './VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaName } from './VicepresidenciaEjecutivaName'

export interface VicepresidenciaEjecutivaPrimitives {
  id: Primitives<VicepresidenciaEjecutivaId>
  name: Primitives<VicepresidenciaEjecutivaName>
}

export class VicepresidenciaEjecutiva {
  constructor (
    private readonly id: VicepresidenciaEjecutivaId,
    private readonly name: VicepresidenciaEjecutivaName
  ) {}

  idValue (): Primitives<VicepresidenciaEjecutivaId> {
    return this.id.value
  }

  nameValue (): Primitives<VicepresidenciaEjecutivaName> {
    return this.name.value
  }

  toPrimitives (): VicepresidenciaEjecutivaPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
