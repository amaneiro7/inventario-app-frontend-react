import { type UserPrimitives } from './User'
import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserId } from './UserId'
import { type UserEmail } from './UserEmail'
import { type ChangePasswordParams } from '../application/changePassoword'
import { type Criteria } from '../../../shared/domain/criteria/Criteria'


export abstract class UserRepository {
    abstract getAll(): Promise<UserPrimitives[]>

    abstract getByCriteria(criteria: Criteria): Promise<UserPrimitives[]>

    abstract getById({ id }: { id: Primitives<UserId> }): Promise<UserPrimitives>

    abstract getByEmail({ email }: { email: Primitives<UserEmail> }): Promise<UserPrimitives>

    abstract register({ payload }: { payload: UserPrimitives }): Promise<void>

    abstract update({ id, payload }: { id: Primitives<UserId>, payload: Partial<UserPrimitives> }): Promise<void>

    abstract changePassword({ password, newPassword, reTypePassword }: ChangePasswordParams): Promise<void>

    abstract resetPassword({ id }: { id: Primitives<UserId> }): Promise<void>

    abstract deleteUser({ id }: { id: Primitives<UserId> }): Promise<void>
}
