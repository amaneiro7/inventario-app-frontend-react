import { DeviceLocation } from '@/modules/devices/devices/devices/domain/DeviceLocation'
import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../../../brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../../category/domain/CategoryDefaultData'
import { CategoryId } from '../../../../category/domain/CategoryId'
import { Device, type DevicePrimitives } from '../../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../../devices/devices/domain/DeviceActivo'
import { DeviceEmployee } from '../../../../devices/devices/domain/DeviceEmployee'
import { DeviceObservation } from '../../../../devices/devices/domain/DeviceObservation'
import { DeviceSerial } from '../../../../devices/devices/domain/DeviceSerial'
import { DeviceStockNumber } from '../../../../devices/devices/domain/DeviceStockNumber'
import { StatusId } from '../../../../devices/status/domain/StatusId'
import { ModelId } from '../../../../model/model/domain/ModelId'
import { HardDriveCapacityId } from '../../hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDriveType/domain/HardDriveTypeId'
import { HardDriveHealth } from './HardDriveHealth'

export interface HardDrivePrimitives extends DevicePrimitives {
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>
}

export class HardDrive extends Device {
  constructor(
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    modelId: ModelId,
    categoryId: CategoryId,
    brandId: BrandId,
    employeeId: DeviceEmployee,
    locationId: DeviceLocation,
    observation: DeviceObservation,
    stockNumber: DeviceStockNumber,
    private readonly health: HardDriveHealth,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId
  ) {
    super(serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)
  }

  static isHardDriveCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedHardDriveCategories: CategoryValues[] = ['Discos Duros']
    return AcceptedHardDriveCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: HardDrivePrimitives) {
    return new HardDrive(
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new ModelId(params.modelId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
      new DeviceObservation(params.observation),
      new DeviceStockNumber(params.stockNumber, params.statusId),
      new HardDriveHealth(params.health),
      new HardDriveCapacityId(params.hardDriveCapacityId),
      new HardDriveTypeId(params.hardDriveTypeId)
    )
  }

  healthValue(): Primitives<HardDriveHealth> {
    return this.health.value
  }

  hardDriveCapacityValue(): Primitives<HardDriveCapacityId> {
    return this.hardDriveCapacityId.value
  }

  hardDriveTypeValue(): Primitives<HardDriveTypeId> {
    return this.hardDriveTypeId.value
  }

  toPrimitives(): HardDrivePrimitives {
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
      stockNumber: this.stockNumberValue(),
      health: this.healthValue(),
      hardDriveCapacityId: this.hardDriveCapacityValue(),
      hardDriveTypeId: this.hardDriveTypeValue()
    }
  }
}
