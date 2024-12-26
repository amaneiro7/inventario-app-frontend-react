import { makeRequest } from '../../../../../shared/infraestructure/fetching'
import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'
import { type HardDriveCapacityRepository } from '../domain/HardDriveCapacityRepository'

export class ApiHardDriveCapacityRepository implements HardDriveCapacityRepository {
  private readonly url: string = 'harddrivecapacities'
  async getAll(): Promise<HardDriveCapacityPrimitives[]> {
    return await makeRequest<HardDriveCapacityPrimitives[]>({ method: 'GET', url: this.url })
      .then((data) => data.map(item => ({
        id: item.id,
        name: `${item.name} Gb`
      })))
  }
}
