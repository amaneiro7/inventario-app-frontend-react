import { type EmployeePrimitives } from '../domain/Employee'
import { EmployeeRepository } from '../domain/EmployeeRepository'

export class AllEmployeeGetter {
  constructor (private readonly repository: EmployeeRepository) {}

  async get (): Promise<EmployeePrimitives[]> {
    return await this.repository.getAll()
  }
}
