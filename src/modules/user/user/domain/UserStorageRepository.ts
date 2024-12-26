import { type UserPrimitives } from './User'

export abstract class UserStorageRepository {
  abstract saveSession({ user }: { user: UserPrimitives }): Promise<void>

  abstract getSession(): Promise<UserPrimitives>

  abstract logOutSession(): Promise<void>
}
