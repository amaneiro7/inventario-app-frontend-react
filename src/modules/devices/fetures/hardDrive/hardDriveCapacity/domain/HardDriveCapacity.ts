import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { type HardDriveCapacityId } from './HardDriveCapacityId'
import { type HardDriveCapacityValues } from './HardDriveCapacityName'

export interface HardDriveCapacityPrimitives {
  id: Primitives<HardDriveCapacityId>
  name: Primitives<HardDriveCapacityValues>
}

export class HardDriveCapacity {
  constructor (
    private readonly id: HardDriveCapacityId,
    private readonly name: HardDriveCapacityValues
  ) {}

  idValue (): Primitives<HardDriveCapacityId> {
    return this.id.value
  }

  nameValue (): Primitives<HardDriveCapacityValues> {
    return this.name.value
  }

  toPrimitives (): HardDriveCapacityPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
