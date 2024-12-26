import { type StatusPrimitives } from './Status'

export abstract class StatusRepository {
  abstract getAll (): Promise<StatusPrimitives[]>
}
