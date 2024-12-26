import { type Repository } from '../domain/repository'
import { ApiAuthRepository } from '../../user/auth/infraestructure/ApiAuthRepository'

export const apiRepository: Repository = {
  auth: new ApiAuthRepository()
}
