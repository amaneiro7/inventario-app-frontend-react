import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../../user/domain/User'

export class CheckToken {
  constructor(private readonly repository: Repository) { }

  async run(): Promise<UserPrimitives & { accessToken: string } | null> {
    const response = await this.repository.auth.checkToken()
    localStorage.setItem('user', JSON.stringify(response))
    return response
  }
}
