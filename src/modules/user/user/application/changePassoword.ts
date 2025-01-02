import { UserPassword } from '../../user/domain/UserPassword'
import { type UserRepository } from '../domain/UserRepository'

export interface ChangePasswordParams {
    password: string
    newPassword: string
    reTypePassword: string
}

export class ChangePassword {
    constructor(private readonly userRepository: UserRepository) { }
    async run({ password, newPassword, reTypePassword }: ChangePasswordParams): Promise<void> {
        if (newPassword !== reTypePassword) {
            throw new Error('Las contraseñas no coinciden')
        }

        if (password === newPassword) {
            throw new Error('La nueva contraseña debe ser diferente a la actual')
        }
        const updatePassword = new UserPassword(newPassword).value
        return await this.userRepository.changePassword({ password, newPassword: updatePassword, reTypePassword })
    }
}
