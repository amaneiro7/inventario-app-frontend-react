import { useCallback, useState } from 'react'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { UserPrimitives } from '../../../modules/user/user/domain/User'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'
import { UserGetterByCriteria } from '../../../modules/user/user/application/UserGetterByCriteria'

export interface UseSearchUsers {
  users: UserPrimitives[]
  loading: boolean
  error: string | null
  searchUsers: (filter: SearchByCriteriaQuery) => Promise<void>
}

export const useSearchUsers = (): UseSearchUsers => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState<UserPrimitives[]>([])

  const searchUsers = useCallback(async (filter: SearchByCriteriaQuery): Promise<void> => {
    setLoading(true)
    new UserGetterByCriteria(new ApiUserRepository())
      .get(filter)
      .then((user) => {
        setUsers(user)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchUsers', error)

        setError(error)
        setLoading(false)
      })
  }, [])

  return {
    users,
    loading,
    error,
    searchUsers
  }
}
