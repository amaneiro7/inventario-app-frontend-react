import { type Repository } from "@/modules/shared/domain/repository"

export class Logout {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<void> {
        const response = await this.repository.auth.logout()
        localStorage.removeItem('user')
        return response
    }
}
