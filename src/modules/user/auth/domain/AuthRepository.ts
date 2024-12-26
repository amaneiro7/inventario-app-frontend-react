import { type UserPrimitives } from '../../user/domain/User'
export abstract class AuthRepository {
  abstract loginLocal({ email, password }: Pick<UserPrimitives, 'email' | 'password'>): Promise<UserPrimitives & { accessToken: string }>
  abstract checkToken(): Promise<UserPrimitives & { accessToken: string } | null>
  abstract refreshToken(): Promise<UserPrimitives & { accessToken: string }>
  abstract logout(): Promise<void>
  abstract changePassword({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }): Promise<void>
}
