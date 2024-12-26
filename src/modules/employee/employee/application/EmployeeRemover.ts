import { EmployeeId } from '../domain/EmployeeId'
import { EmployeeRepository } from '../domain/EmployeeRepository'

export class EmployeeRemover {
  constructor (private readonly repository: EmployeeRepository) {}

  async remove (id: string): Promise<void> {
    const employeeId = new EmployeeId(id)
    await this.repository.remove({ id: employeeId })
  }
}
