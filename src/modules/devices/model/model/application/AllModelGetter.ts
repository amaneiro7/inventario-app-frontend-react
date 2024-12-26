import { type ModelPrimitives } from '../domain/Model'
import { ModelRepository } from '../domain/ModelRepository'

export class AllModelGetter {
  constructor(private readonly repository: ModelRepository) { }
  async get(): Promise<ModelPrimitives[]> {
    return await this.repository.getAll()
  }
}
