import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaId } from '../../vicepresidenciaejecutiva/domain/VicepresidenciaEjecutivaId'
import { type VicepresidenciaId } from './VicepresidenciaId'
import { type VicepresidenciaName } from './VicepresidenciaName'

export interface VicepresidenciaPrimitives {
  id: Primitives<VicepresidenciaId>
  name: Primitives<VicepresidenciaName>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
}

export class Vicepresidencia {
  constructor (
    private readonly id: VicepresidenciaId,
    private readonly name: VicepresidenciaName,
    private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId
  ) {}

  idValue (): Primitives<VicepresidenciaId> {
    return this.id.value
  }

  nameValue (): Primitives<VicepresidenciaName> {
    return this.name.value
  }

  vicepresidenciaEjecutivaValue (): Primitives<VicepresidenciaEjecutivaId> {
    return this.vicepresidenciaEjecutivaId.value
  }

  toPrimitives (): VicepresidenciaPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue(),
      vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue()
    }
  }
}
