import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type Criteria } from '../../../shared/domain/criteria/Criteria'
import { type ChangePasswordParams } from '../application/changePassoword'
import { type UserPrimitives } from '../domain/User'
import { type UserEmail } from '../domain/UserEmail'
import { type UserId } from '../domain/UserId'
import { type UserRepository } from '../domain/UserRepository'

export class ApiUserRepository implements UserRepository {
    private readonly url: string = 'users'
    async getAll(): Promise<UserPrimitives[]> {
        return await makeRequest({ method: 'GET', url: `${this.url}/all` })
    }

    async getByCriteria(criteria: Criteria): Promise<UserPrimitives[]> {
        const criteriaPrimitives = criteria.toPrimitives()

        const queryParams = criteria.buildQuery(criteriaPrimitives)
        return await makeRequest({ method: 'GET', url: `${this.url}?${queryParams}` })
    }
    async getByEmail({ email }: { email: Primitives<UserEmail>; }): Promise<UserPrimitives> {
        return await makeRequest({ method: 'GET', url: `${this.url}/by-email`, data: { email } })
    }

    async getById({ id }: { id: Primitives<UserId>; }): Promise<UserPrimitives> {
        return await makeRequest({ method: 'GET', url: `${this.url}/${id}` })
    }

    async register({ payload }: { payload: UserPrimitives; }): Promise<void> {
        return await makeRequest({ method: 'POST', url: `${this.url}/register`, data: payload })
    }

    async update({ id, payload }: { id: Primitives<UserId>; payload: Partial<UserPrimitives>; }): Promise<void> {
        return await makeRequest({ method: 'PATCH', url: `${this.url}/update`, data: { id, payload } })
    }

    async changePassword({ password, newPassword, reTypePassword }: ChangePasswordParams): Promise<void> {
        return await makeRequest({ method: 'PATCH', url: `${this.url}/change-password`, data: { password, newPassword, reTypePassword } })
    }

    async resetPassword({ id }: { id: Primitives<UserId>; }): Promise<void> {
        return await makeRequest({ method: 'PATCH', url: `${this.url}/reset-password`, data: { id } })
    }

    async deleteUser({ id }: { id: Primitives<UserId>; }): Promise<void> {
        return await makeRequest({ method: 'DELETE', url: this.url, data: { id } })
    }
}
