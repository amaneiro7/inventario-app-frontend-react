import { type CargoPrimitives } from './cargo'

export abstract class CargoRepository {
  abstract getAll (): Promise<CargoPrimitives[]>
}
