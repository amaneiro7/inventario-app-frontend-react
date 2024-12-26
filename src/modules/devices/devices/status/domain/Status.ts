import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type StatusId } from './StatusId'
import { type StatusName } from './StatusName'

export interface StatusPrimitives {
  id: Primitives<StatusId>
  name: Primitives<StatusName>
}
export class Status {
  constructor (
    private readonly id: StatusId,
    private readonly name: StatusName
  ) {}

  idValue (): Primitives<StatusId> {
    return this.id.value
  }

  nameValue (): Primitives<StatusName> {
    return this.name.value
  }

  toPrimitives (): StatusPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
