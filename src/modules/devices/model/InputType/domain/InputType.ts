import { Primitives } from "../../../../shared/domain/value-object/Primitives"
import { InputTypeId } from "./InputTypeId"
import { InputTypeName } from "./InputTypeName"

export interface InputTypePrimitives {
  id: Primitives<InputTypeId>
  name: Primitives<InputTypeName>
}

export class InputType {
  constructor (
    private readonly id: InputTypeId,
    private readonly name: InputTypeName
  ) {}

  idValue (): Primitives<InputTypeId> {
    return this.id.value
  }

  nameValue (): Primitives<InputTypeName> {
    return this.name.value
  }

  toPrimitives (): InputTypePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
