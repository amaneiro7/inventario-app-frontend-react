import { type GerenciaPrimitives } from '../domain/gerencia'
import { GerenciaRepository } from '../domain/gerenciaRepository'

export class AllGerenciaGetter {
  constructor (private readonly repository: GerenciaRepository) {}

  async get (): Promise<GerenciaPrimitives[]> {
    return await this.repository.getAll()
  }
}
