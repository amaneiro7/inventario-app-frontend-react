import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { type OperatingSystemArqId } from './OperatingSystemArqId'
import { type OperatingSystemArqName } from './OperatingSystemArqName'

export interface OperatingSystemArqPrimitives {
  id: Primitives<OperatingSystemArqId>
  name: Primitives<OperatingSystemArqName>
}

export class OperatingSystemArq {
  constructor (
    private readonly id: OperatingSystemArqId,
    private readonly name: OperatingSystemArqName
  ) {}

  idValue (): Primitives<OperatingSystemArqId> {
    return this.id.value
  }

  nameValue (): Primitives<OperatingSystemArqName> {
    return this.name.value
  }

  toPrimitives (): OperatingSystemArqPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
