import { type RoleId } from './RoleId'
import { type RoleName } from './RoleName'

export interface RolePrimitives {
  id: number
  name: string
}

export class Role {
  constructor (
    private readonly id: RoleId,
    private readonly name: RoleName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): RolePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
