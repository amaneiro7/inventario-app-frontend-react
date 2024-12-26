import { type VicepresidenciaPrimitives } from '../domain/Vicepresidencia'
import { VicepresidenciaRepository } from '../domain/VicepresidenciaRepository'

export class AllVicepresidenciaGetter {
  constructor (private readonly repository: VicepresidenciaRepository) {}

  async get (): Promise<VicepresidenciaPrimitives[]> {
    return await this.repository.getAll()
  }
}
