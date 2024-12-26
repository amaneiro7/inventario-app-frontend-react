import { type InputTypePrimitives } from '../domain/InputType'
import { InputTypeRepository } from '../domain/InputTypeRepository'

export class AllInputTypeGetter {
  constructor(private readonly repository: InputTypeRepository) { }

  async get(): Promise<InputTypePrimitives[]> {
    return await this.repository.getAll()
  }
}
