import { type OperatingSystemArqPrimitives } from '../domain/OperatingSystemArq'
import { OperatingSystemArqRepository } from '../domain/OperatingSystemArqRepository'

export class AllOperatingSystemArqGetter {
  constructor (readonly repository: OperatingSystemArqRepository) {}

  async get (): Promise<OperatingSystemArqPrimitives[]> {
    return await this.repository.getAll()
  }
}
