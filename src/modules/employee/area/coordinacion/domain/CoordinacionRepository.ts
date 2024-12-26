import { type CoordinacionPrimitives } from './Coordinacion'

export abstract class CoordinacionRepository {
  abstract getAll (): Promise<CoordinacionPrimitives[]>
}
