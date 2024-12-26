import { type VicepresidenciaEjecutivaPrimitives } from './VicepresidenciaEjecutiva'

export abstract class VicepresidenciaEjecutivaRepository {
  abstract getAll (): Promise<VicepresidenciaEjecutivaPrimitives[]>
}
