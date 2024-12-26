import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { type OperatingSystemId } from './OperatingSystemId'
import { type OperatingSystemName } from './OperatingSystemName'

export interface OperatingSystemPrimitives {
  id: Primitives<OperatingSystemId>
  name: Primitives<OperatingSystemName>
}

export class OperatingSystem {
  constructor (
    private readonly id: OperatingSystemId,
    private readonly name: OperatingSystemName
  ) {}

  idValue (): Primitives<OperatingSystemId> {
    return this.id.value
  }

  nameValue (): Primitives<OperatingSystemName> {
    return this.name.value
  }

  toPrimitives (): OperatingSystemPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
