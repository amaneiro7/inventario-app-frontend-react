import { type AuthRepository } from '../../user/auth/domain/AuthRepository'
export interface Repository {
  auth: AuthRepository
}
