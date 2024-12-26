import { type StatePrimitives } from './state'

export abstract class StateRepository {
  abstract getAll (): Promise<StatePrimitives[]>
}
