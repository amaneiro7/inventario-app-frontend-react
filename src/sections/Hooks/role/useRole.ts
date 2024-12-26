import { useCallback, useEffect, useState } from 'react'
import { ApiRoleRepository } from '../../../modules/user/role/infrastructure/ApiRoleRepository'
import { AllRoleGetter } from '../../../modules/user/role/application/AllRoleGetter'
import { RolePrimitives } from '../../../modules/user/role/domain/Role'


export interface UseRole {
  roles: RolePrimitives[]
  loading: boolean
  error: Error | null
}

export const useRole = (): UseRole => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<RolePrimitives[]>([])

  const getRole = useCallback(() => {
    setLoading(true)
    new AllRoleGetter(new ApiRoleRepository())
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getRole()

    return () => {
      setData([])
    }
  }, [getRole])

  return {
    roles: data,
    loading,
    error
  }
}
