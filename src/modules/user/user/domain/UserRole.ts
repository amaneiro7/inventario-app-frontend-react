import { Primitives } from "../../../shared/domain/value-object/Primitives";
import { RoleId } from "../../role/domain/RoleId";

export class UserRole extends RoleId {
    constructor(value: Primitives<RoleId>) {
        super(value)
        if (!UserRole.isValid(value)) {
            throw new Error(UserRole.invalidMessage())
        }
    }

    public static isValid(value: Primitives<UserRole>): boolean {
        return value !== UserRole.Options.ADMIN
    }

    public static invalidMessage(): string {
        return `No est'a permitido asignad el rol administrador`
    }
}