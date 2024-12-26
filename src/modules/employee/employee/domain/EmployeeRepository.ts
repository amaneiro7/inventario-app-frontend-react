import { type Criteria } from '../../../shared/domain/criteria/Criteria'
import { type Employee, type EmployeePrimitives } from './Employee'
import { type EmployeeId } from './EmployeeId'

export abstract class EmployeeRepository {
  abstract getAll (): Promise<EmployeePrimitives[]>

  abstract getByCriteria (criteria: Criteria): Promise<EmployeePrimitives[]>

  abstract getById ({ id }: { id: EmployeeId }): Promise<EmployeePrimitives>
  
  abstract save ({ employee }: { employee: Employee }): Promise<void>
  
  abstract update ({ id, employee }: { id: EmployeeId, employee: Employee }): Promise<void>
  
  abstract remove ({ id }: { id: EmployeeId }): Promise<void>
}
