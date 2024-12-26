import { type OperatingSystemPrimitives } from '../domain/OperatingSystem'
import { OperatingSystemRepository } from '../domain/OperatingSystemRepository'

export class AllOperatingSystemGetter {
  constructor (readonly repository: OperatingSystemRepository) {}

  async get (): Promise<OperatingSystemPrimitives[]> {
    return await this.repository.getAll()
  }
}
