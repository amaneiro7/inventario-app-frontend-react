import { makeRequest } from "../../../../shared/infraestructure/fetching"
import { InputTypePrimitives } from "../domain/InputType"
import { InputTypeRepository } from "../domain/InputTypeRepository"

export class ApiInputTypeRepository implements InputTypeRepository {
  private readonly url: string = 'inputtypes'
  async getAll(): Promise<InputTypePrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }
}
