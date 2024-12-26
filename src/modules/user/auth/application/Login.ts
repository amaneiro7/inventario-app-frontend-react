import { type Repository } from "@/modules/shared/domain/repository";
import { type UserPrimitives } from "../../user/domain/User";
export class Login {
  constructor(private readonly repository: Repository) { }

  async run(email: string, password: string): Promise<UserPrimitives & { accessToken: string }> {
    const response = await this.repository.auth.loginLocal({ email, password })
    localStorage.setItem('user', JSON.stringify(response))
    return response
  }
}
