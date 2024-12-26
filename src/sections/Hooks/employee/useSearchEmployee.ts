import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { ApiEmployeeRepository } from '../../../modules/employee/employee/infrastructure/ApiEmployeeRepository'

export interface UseSearchEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  searchEmployees: (filter: SearchByCriteriaQuery) => Promise<void>
}

export const useSearchEmployee = (): UseSearchEmployee => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])

  const searchEmployees = useCallback(async (filter: SearchByCriteriaQuery): Promise<void> => {
    setLoading(true)
    new EmployeeGetterByCriteria(new ApiEmployeeRepository())
      .get(filter)
      .then((devices) => {
        setEmployees(devices)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)

        setError(error)
        setLoading(false)
      })
  }, [])

  return {
    employees,
    loading,
    error,
    searchEmployees
  }
}
