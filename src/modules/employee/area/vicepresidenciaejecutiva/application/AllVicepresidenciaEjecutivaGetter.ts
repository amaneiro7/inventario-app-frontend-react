import { type VicepresidenciaEjecutivaPrimitives } from '../domain/VicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivaRepository } from '../domain/VicepresidenciaEjecutivaRepository'

export class AllVicepresidenciaEjecutivaGetter {
  constructor (private readonly repository: VicepresidenciaEjecutivaRepository) {}

  async get (): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await this.repository.getAll()
  }
}
