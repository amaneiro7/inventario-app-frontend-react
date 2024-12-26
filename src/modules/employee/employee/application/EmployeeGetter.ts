import { type EmployeePrimitives } from '../domain/Employee'
import { EmployeeId } from '../domain/EmployeeId'
import { EmployeeRepository } from '../domain/EmployeeRepository'

export class EmployeeGetter {
  constructor (private readonly repository: EmployeeRepository) {}

  async getById (id: string): Promise<EmployeePrimitives> {
    const employeeId = new EmployeeId(id)
    return await this.repository.getById({ id: employeeId })
  }
}
