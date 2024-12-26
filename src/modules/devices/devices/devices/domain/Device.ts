import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { type DeviceId } from './DeviceId'
import { LocationId } from '../../../../location/locations/domain/locationId'
import { BrandId } from '../../../brand/domain/BrandId'
import { CategoryId } from '../../../category/domain/CategoryId'
import { ModelId } from '../../../model/model/domain/ModelId'
import { StatusId } from '../../status/domain/StatusId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceEmployee } from './DeviceEmployee'
import { DeviceObservation } from './DeviceObservation'
import { DeviceSerial } from './DeviceSerial'
import { DeviceStockNumber } from './DeviceStockNumber'
import { DeviceLocation } from './DeviceLocation'
import { type TypeOfSiteId } from '@/modules/location/typeofsites/domain/typeOfSiteId'

export interface DevicePrimitives {
  id?: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelId>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<LocationId>
  typeOfSiteId?: Primitives<TypeOfSiteId>
  genericModel?: boolean
  observation: Primitives<DeviceObservation>
  stockNumber: Primitives<DeviceStockNumber>
}
export class Device {
  constructor(
    private readonly serial: DeviceSerial,
    private readonly activo: DeviceActivo,
    private readonly statusId: StatusId,
    private readonly categoryId: CategoryId,
    private readonly brandId: BrandId,
    private readonly modelId: ModelId,
    private readonly employeeId: DeviceEmployee,
    private readonly locationId: DeviceLocation,
    private readonly observation: DeviceObservation,
    private readonly stockNumber: DeviceStockNumber
  ) { }

  public static create(params: DevicePrimitives): Device {
    return new Device(
      new DeviceSerial(params.serial, params.genericModel),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new ModelId(params.modelId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
      new DeviceObservation(params.observation),
      new DeviceStockNumber(params.stockNumber, params.statusId)
    )
  }

  serialValue(): Primitives<DeviceSerial> {
    return this.serial.value
  }

  activoValue(): Primitives<DeviceActivo> | null {
    return this.activo.value
  }

  statusValue(): Primitives<StatusId> {
    return this.statusId.value
  }

  categoryValue(): Primitives<CategoryId> {
    return this.categoryId.value
  }

  brandValue(): Primitives<BrandId> {
    return this.brandId.value
  }

  modelValue(): Primitives<ModelId> {
    return this.modelId.value
  }

  employeeValue(): Primitives<DeviceEmployee> {
    return this.employeeId.value
  }

  locationValue(): Primitives<LocationId> {
    return this.locationId.value
  }

  observationValue(): Primitives<DeviceObservation> {
    return this.observation.value
  }

  stockNumberValue(): Primitives<DeviceStockNumber> {
    return this.stockNumber.value
  }

  toPrimitives(): DevicePrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusValue(),
      modelId: this.modelValue(),
      categoryId: this.categoryValue(),
      brandId: this.brandValue(),
      employeeId: this.employeeValue(),
      locationId: this.locationValue(),
      observation: this.observationValue(),
      stockNumber: this.stockNumberValue()
    }
  }
}
