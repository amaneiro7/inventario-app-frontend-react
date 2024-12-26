import { type Criteria } from '../../../shared/domain/criteria/Criteria'
import { type EmployeesApiResponse } from '../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type EmployeePrimitives, type Employee } from '../domain/Employee'
import { type EmployeeId } from '../domain/EmployeeId'
import { type EmployeeRepository } from '../domain/EmployeeRepository'

export class ApiEmployeeRepository implements EmployeeRepository {
  private readonly url: string = 'employees'
  async save({ employee }: { employee: Employee }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: employee.toPrimitives() })
  }

  async update({ id, employee }: { id: EmployeeId, employee: Employee }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: employee.toPrimitives() })
  }

  async getByCriteria(criteria: Criteria): Promise<EmployeePrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest<EmployeesApiResponse[]>({ method: 'GET', url: `${this.url}?${queryParams}` })
  }

  async getAll(): Promise<EmployeePrimitives[]> {
    return await makeRequest<EmployeesApiResponse[]>({ method: 'GET', url: `${this.url}/all` })
  }

  async getById({ id }: { id: EmployeeId }): Promise<EmployeePrimitives> {
    return await makeRequest<EmployeesApiResponse>({ method: 'GET', url: `${this.url}/${id.value}` })
  }

  async remove({ id }: { id: EmployeeId }): Promise<void> {
    return await makeRequest({ method: 'DELETE', url: `${this.url}/${id.value}` })
  }
}
