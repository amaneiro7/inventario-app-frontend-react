import { type Repository } from "@/modules/shared/domain/repository"
import { type UserPrimitives } from "../../user/domain/User"

export class RefreshToken {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<UserPrimitives & { accessToken: string }> {
        const response = await this.repository.auth.refreshToken()
        localStorage.setItem('user', JSON.stringify(response))
        return response
    }
}
