import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { type HardDriveTypeId } from './HardDriveTypeId'
import { type HardDriveTypeName } from './HardDriveTypeName'

export interface HardDriveTypePrimitives {
  id: Primitives<HardDriveTypeId>
  name: Primitives<HardDriveTypeName>
}

export class HardDriveType {
  constructor (
    private readonly id: HardDriveTypeId,
    private readonly name: HardDriveTypeName
  ) {}

  idValue (): Primitives<HardDriveTypeId> {
    return this.id.value
  }

  nameValue (): Primitives<HardDriveTypeName> {
    return this.name.value
  }

  toPrimitives (): HardDriveTypePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
