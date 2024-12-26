import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { type MemoryRamTypeId } from './MemoryRamTypeId'
import { type MemoryRamTypeName } from './MemoryRamTypeName'

export interface MemoryRamTypePrimitives {
  id: Primitives<MemoryRamTypeId>
  name: Primitives<MemoryRamTypeName>
}

export class MemoryRamType {
  constructor (
    private readonly id: MemoryRamTypeId,
    private readonly name: MemoryRamTypeName
  ) {}

  idValue (): Primitives<MemoryRamTypeId> {
    return this.id.value
  }

  nameValue (): Primitives<MemoryRamTypeName> {
    return this.name.value
  }

  toPrimitives (): MemoryRamTypePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
