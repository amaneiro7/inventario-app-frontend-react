import { useCallback, useEffect, useState } from 'react'
import { EmployeeGetterByCriteria } from '../../../modules/employee/employee/application/EmployeeGetterByCriteria'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { ApiEmployeeRepository } from '../../../modules/employee/employee/infrastructure/ApiEmployeeRepository'

export interface UseEmployee {
  employeeWithDevives: EmployeePrimitives[]
  loading: boolean
  error: string | null
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useEmployeeByCriteria = (defaultQuery?: SearchByCriteriaQuery): UseEmployee => {
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [employeeWithDevives, setEmployeeWithDevives] = useState<EmployeePrimitives[]>([])

  const searchEmployeesByCriteria = useCallback(() => {
    setLoading(true)
    new EmployeeGetterByCriteria(new ApiEmployeeRepository())
      .get(query)
      .then((employees) => {
        setEmployeeWithDevives(employees)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }, [query])

  useEffect(() => {
    searchEmployeesByCriteria()
    return () => {
      setEmployeeWithDevives([])
    }
  }, [searchEmployeesByCriteria])

  return {
    employeeWithDevives,
    loading,
    error,
    addFilter,
    cleanFilters
  }
}
