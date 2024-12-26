import { type ModelPrimitives } from '../domain/Model'
import { ModelId } from '../domain/ModelId'
import { ModelRepository } from '../domain/ModelRepository'

export class ModelGetter {
  constructor (readonly repository: ModelRepository) {}
  async getById ({ id }: { id: string }): Promise<ModelPrimitives | null> {
    return await this.repository.getById({ id: new ModelId(id) }) ?? null
  }
}
