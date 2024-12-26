import { type InputTypePrimitives } from './InputType'

export abstract class InputTypeRepository {
  abstract getAll (): Promise<InputTypePrimitives[]>
}
