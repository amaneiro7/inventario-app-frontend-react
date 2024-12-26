import { type DevicePrimitives } from '../../../devices/devices/devices/domain/Device'
import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserName } from '../../../user/user/domain/UserName'
import { type EmployeeId } from './EmployeeId'
import { EmployeeUserName } from './UserName'

export interface EmployeePrimitives {
  id?: Primitives<EmployeeId>
  // name: Primitives<EmployeeName>
  // lastName: Primitives<EmployeeLastName>
  userName: Primitives<EmployeeUserName>
  // cedula: Primitives<Cedula>
  // locationId: Primitives<LocationId>
  // email: Primitives<EmployeeEmail>
  // cargoId: Primitives<CargoId>
  // extension: Primitives<Extension>
  // phoneNumber: Primitives<PhoneNumber>
  // vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  // vicepresidenciaId: Primitives<VicepresidenciaId>
  // gerenciaId: Primitives<GerenciaId>
  // coordinacionId: Primitives<CoordinacionId>
  devices?: DevicePrimitives[]
}

export class Employee {
  constructor (
    // private readonly name: EmployeeName,
    // private readonly lastName: EmployeeName,
    private readonly userName: UserName
    // private readonly cedula: Cedula,
    // private readonly locationId: LocationId,
    // private readonly email: EmployeeEmail,
    // private readonly cargoId: CargoId,
    // private readonly extension: Extension,
    // private readonly phoneNumber: PhoneNumber,
    // private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
    // private readonly vicepresidenciaId: VicepresidenciaId,
    // private readonly gerenciaId: GerenciaId,
    // private readonly coordinacionId: CoordinacionId
  ) {}

  public static create (params: Omit<EmployeePrimitives, 'id' | 'devices'>): Employee {
    return new Employee(
      // new EmployeeName(params.name),
      // new EmployeeLastName(params.lastName),
      new EmployeeUserName(params.userName)
      // new Cedula(params.cedula),
      // new LocationId(params.locationId),
      // new EmployeeEmail(params.email),
      // new CargoId(params.cargoId),
      // new Extension(params.extension),
      // new PhoneNumber(params.phoneNumber),
      // new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId),
      // new VicepresidenciaId(params.vicepresidenciaId),
      // new GerenciaId(params.gerenciaId),
      // new CoordinacionId(params.coordinacionId)
    )
  }

  // nameValue (): Primitives<EmployeeName> {
  //   return this.name.value
  // }

  // lastNameValue (): Primitives<EmployeeLastName> {
  //   return this.lastName.value
  // }

  userNameValue (): Primitives<EmployeeUserName> {
    return this.userName.value
  }

  // cedulaValue (): Primitives<Cedula> {
  //   return this.cedula.value
  // }

  // locationValue (): Primitives<LocationId> {
  //   return this.locationId.value
  // }

  // emailValue (): Primitives<EmployeeEmail> {
  //   return this.email.value
  // }

  // cargoValue (): Primitives<CargoId> {
  //   return this.cargoId.value
  // }

  // extensionValue (): Primitives<Extension> {
  //   return this.extension.value
  // }

  // phoneNumberValue (): Primitives<PhoneNumber> {
  //   return this.phoneNumber.value
  // }

  // vicepresidenciaEjecutivaValue (): Primitives<VicepresidenciaEjecutivaId> {
  //   return this.vicepresidenciaEjecutivaId.value
  // }

  // vicepresidenciaValue (): Primitives<VicepresidenciaId> {
  //   return this.vicepresidenciaId.value
  // }

  // gerenciaValue (): Primitives<GerenciaId> {
  //   return this.gerenciaId.value
  // }

  // coordinacionValue (): Primitives<CoordinacionId> {
  //   return this.coordinacionId.value
  // }

  toPrimitives (): EmployeePrimitives {
    return {
      // name: this.nameValue(),
      // lastName: this.lastNameValue(),
      userName: this.userNameValue()
      // cedula: this.cedulaValue(),
      // locationId: this.locationValue(),
      // email: this.emailValue(),
      // cargoId: this.cargoValue(),
      // extension: this.extensionValue(),
      // phoneNumber: this.phoneNumberValue(),
      // vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue(),
      // vicepresidenciaId: this.vicepresidenciaValue(),
      // gerenciaId: this.gerenciaValue(),
      // coordinacionId: this.coordinacionValue()
    }
  }
}
