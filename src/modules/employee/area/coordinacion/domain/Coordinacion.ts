import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type GerenciaId } from '../../gerencia/domain/GerenciaId'
import { type CoordinacionId } from './CoordinacionId'
import { type CoordinacionName } from './CoordinacionName'

export interface CoordinacionPrimitives {
  id: Primitives<CoordinacionId>
  name: Primitives<CoordinacionName>
  gerenciaId: Primitives<GerenciaId>
}

export class Gerencia {
  constructor (
    private readonly id: CoordinacionId,
    private readonly name: CoordinacionName,
    private readonly gerenciaId: GerenciaId
  ) {}

  idValue (): Primitives<CoordinacionId> {
    return this.id.value
  }

  nameValue (): Primitives<CoordinacionName> {
    return this.name.value
  }

  gerenciaValue (): Primitives<GerenciaId> {
    return this.gerenciaId.value
  }

  toPrimitives (): CoordinacionPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue(),
      gerenciaId: this.gerenciaValue()
    }
  }
}
