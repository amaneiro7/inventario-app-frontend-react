import { Employee, type EmployeePrimitives } from '../domain/Employee'
import { EmployeeId } from '../domain/EmployeeId'
import { EmployeeRepository } from '../domain/EmployeeRepository'

export class EmployeeCreator {
  constructor (private readonly repository: EmployeeRepository) {}

  async create (params: EmployeePrimitives) {
    const employee = Employee.create(params)

    if (params.id === undefined) {
      return await this.repository.save({ employee })
    } else {
      const employeeId = new EmployeeId(params.id)
      return await this.repository.update({ id: employeeId, employee })
    }
  }
}
