import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type VicepresidenciaId } from '../../vicepresidencia/domain/VicepresidenciaId'
import { type GerenciaId } from './GerenciaId'
import { type GerenciaName } from './GerenciaName'

export interface GerenciaPrimitives {
  id: Primitives<GerenciaId>
  name: Primitives<GerenciaName>
  vicepresidenciaId: Primitives<VicepresidenciaId>
}

export class Gerencia {
  constructor (
    private readonly id: GerenciaId,
    private readonly name: GerenciaName,
    private readonly vicepresidenciaId: VicepresidenciaId
  ) {}

  idValue (): Primitives<GerenciaId> {
    return this.id.value
  }

  nameValue (): Primitives<GerenciaName> {
    return this.name.value
  }

  vicepresidenciaValue (): Primitives<VicepresidenciaId> {
    return this.vicepresidenciaId.value
  }

  toPrimitives (): GerenciaPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue(),
      vicepresidenciaId: this.vicepresidenciaValue()
    }
  }
}
