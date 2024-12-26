import { NumberValueObject } from '../../../shared/domain/value-object/NumberValueObject'

export class RoleId extends NumberValueObject {
    static readonly Options: Record<string, number> = {
        ADMIN: 1,
        SPECIALIST: 2,
        COORD: 3,
        GERENTE: 4
    } as const
}
