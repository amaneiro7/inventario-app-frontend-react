import { RoleId } from '../../role/domain/RoleId'
import { UserEmail } from './UserEmail'
import { UserName } from './UserName'
import { UserLastName } from './UserLastName'
import { type UserPassword } from './UserPassword'
import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserId } from './UserId'

export interface UserPrimitives {
  id?: Primitives<UserId>
  name: Primitives<UserName>
  lastName: Primitives<UserLastName>
  email: Primitives<UserEmail>
  roleId: Primitives<RoleId>
  password?: Primitives<UserPassword>
}
export class User {
  constructor(
    private readonly name: UserName,
    private readonly lastName: UserLastName,
    private readonly email: UserEmail,
    private readonly roleId: RoleId,
  ) { }

  public static create({ name, lastName, email, roleId }: UserPrimitives): User {
    return new User(
      new UserName(name),
      new UserLastName(lastName),
      new UserEmail(email),
      new RoleId(roleId),
    )
  }

  static isSuperAdmin({ roleId }: { roleId: Primitives<RoleId> }): boolean {
    const acceptedAdminRoles = [RoleId.Options.ADMIN, RoleId.Options.COORD]
    return acceptedAdminRoles.includes(roleId)
  }

  nameValue(): Primitives<UserName> {
    return this.name.value
  }

  lastNameValue(): Primitives<UserLastName> {
    return this.lastName.value
  }

  emailValue(): Primitives<UserEmail> {
    return this.email.value
  }

  roleIdValue(): Primitives<RoleId> {
    return this.roleId.value
  }


  toPrimitives(): UserPrimitives {
    return {
      name: this.nameValue(),
      lastName: this.lastNameValue(),
      email: this.emailValue(),
      roleId: this.roleIdValue(),
    }
  }
}
