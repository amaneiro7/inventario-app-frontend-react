import { type Primitives } from "../../../shared/domain/value-object/Primitives"
import { BrandId } from "../../brand/domain/BrandId"
import { CategoryDefaultData, CategoryNames, CategoryValues } from "../../category/domain/CategoryDefaultData"
import { CategoryId } from "../../category/domain/CategoryId"
import { Device, DevicePrimitives } from "../../devices/devices/domain/Device"
import { DeviceActivo } from "../../devices/devices/domain/DeviceActivo"
import { DeviceEmployee } from "../../devices/devices/domain/DeviceEmployee"
import { DeviceLocation } from "../../devices/devices/domain/DeviceLocation"
import { DeviceObservation } from "../../devices/devices/domain/DeviceObservation"
import { DeviceSerial } from "../../devices/devices/domain/DeviceSerial"
import { DeviceStockNumber } from "../../devices/devices/domain/DeviceStockNumber"
import { StatusId } from "../../devices/status/domain/StatusId"
import { ModelId } from "../../model/model/domain/ModelId"
import { IPAddress } from "../computer/domain/IPAddress"

export interface MFPPrimitives extends DevicePrimitives {
  ipAddress: Primitives<IPAddress>
}

export class MFP extends Device {
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
    private readonly ipAddress: IPAddress,

  ) {
    super(serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)
  }

  static isMFPCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedMFPCategories: CategoryValues[] = [CategoryNames.MFP]
    return AcceptedMFPCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: MFPPrimitives) {
    return new MFP(
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
      new IPAddress(params.ipAddress, params.statusId)

    )
  }

  ipAddressValue(): Primitives<IPAddress> {
    return this.ipAddress.value
  }
  toPrimitives(): MFPPrimitives {
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
      ipAddress: this.ipAddressValue()
    }
  }
}
