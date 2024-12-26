import { type RegionPrimitives } from './region'

export abstract class RegionRepository {
  abstract getAll (): Promise<RegionPrimitives[]>
}
