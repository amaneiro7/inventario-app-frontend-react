import { useCallback, useEffect, useMemo, useState } from 'react'
import { EmployeeGetter } from '../../../modules/employee/employee/application/EmployeeGetter'
import { EmployeeCreator } from '../../../modules/employee/employee/application/EmployeeCreator'
import { AllEmployeeGetter } from '../../../modules/employee/employee/application/AllEmployeeGetter'
import { ApiEmployeeRepository } from '../../../modules/employee/employee/infrastructure/ApiEmployeeRepository'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'

export interface UseEmployee {
  employees: EmployeePrimitives[]
  loading: boolean
  error: string | null
  getEmployee: EmployeeGetter
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
}

export const useEmployee = (): UseEmployee => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeePrimitives[]>([])

  const repository = useMemo(() => { return new ApiEmployeeRepository() }, [])
  const getEmployee = useMemo(() => { return new EmployeeGetter(repository) }, [repository])

  const searchEmployees = useCallback(() => {
    setLoading(true)
    new AllEmployeeGetter(repository)
      .get()
      .then((employees) => {
        setEmployees(employees)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchEmployees', error)
        setError('An unexpected error occurred while trying to search employees')
        setLoading(false)
      })
  }, [repository])

  const createEmployee = useCallback(async (formData: EmployeePrimitives) => {
    const data = await new EmployeeCreator(repository).create(formData)
    searchEmployees()
    return data
  }, [repository, searchEmployees])

  useEffect(() => {
    searchEmployees()
    return () => {
      setEmployees([])
    }
  }, [searchEmployees])
  return {
    employees,
    loading,
    error,
    getEmployee,
    createEmployee,
  }
}
