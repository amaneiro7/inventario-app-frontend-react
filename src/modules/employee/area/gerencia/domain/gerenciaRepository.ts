import { type GerenciaPrimitives } from './gerencia'

export abstract class GerenciaRepository {
  abstract getAll (): Promise<GerenciaPrimitives[]>
}
