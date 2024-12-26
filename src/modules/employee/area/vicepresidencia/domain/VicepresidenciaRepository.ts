import { type VicepresidenciaPrimitives } from './Vicepresidencia'

export abstract class VicepresidenciaRepository {
  abstract getAll (): Promise<VicepresidenciaPrimitives[]>
}
