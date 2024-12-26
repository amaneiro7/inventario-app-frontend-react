import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useEmployee } from './useEmployee'
import { type DefaultEmployeeProps } from './DefaultInitialState'

export const useEmployeeInitialState = (defaultInitialEmployeeState: DefaultEmployeeProps) => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { getEmployee } = useEmployee()
  const [preloadedEmployeeState, setPreloadedEmployeeState] = useState(defaultInitialEmployeeState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchEmployee = useCallback(() => {
    getEmployee.getById(id)
      .then(employee => {
        setPreloadedEmployeeState(employee as DefaultEmployeeProps)
      })
      .catch(error => {
        console.error('useEmployeeInitialState', error)
      })
  }, [getEmployee, id])

  const setResetState = () => {
    if (location.pathname.includes('employee')) return
    if (isAddForm) {
      setPreloadedEmployeeState({ id: undefined, ...defaultInitialEmployeeState })
    } else {
      fetchEmployee()
    }
  }

  useEffect(() => {
    if (isAddForm || !location.pathname.includes('employee')) {
      setPreloadedEmployeeState(defaultInitialEmployeeState)
      return
    }

    if (location.state?.state !== undefined) {
      const employee = location.state?.state
      setPreloadedEmployeeState(employee)
    } else {
      if (!id) {
        navidate('/error')
        return
      }
      fetchEmployee()
    }

  }, [defaultInitialEmployeeState, fetchEmployee, id, isAddForm, location.pathname, location.state?.state, navidate])

  return {
    preloadedEmployeeState,
    setResetState,
    isAddForm
  }
}
