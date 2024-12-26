import { DeviceLocation } from '@/modules/devices/devices/devices/domain/DeviceLocation'
import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { BrandId } from '../../../brand/domain/BrandId'
import { CategoryDefaultData, type CategoryValues } from '../../../category/domain/CategoryDefaultData'
import { CategoryId } from '../../../category/domain/CategoryId'
import { Device, type DevicePrimitives } from '../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../devices/devices/domain/DeviceActivo'
import { DeviceEmployee } from '../../../devices/devices/domain/DeviceEmployee'
import { DeviceObservation } from '../../../devices/devices/domain/DeviceObservation'
import { DeviceSerial } from '../../../devices/devices/domain/DeviceSerial'
import { DeviceStockNumber } from '../../../devices/devices/domain/DeviceStockNumber'
import { StatusId } from '../../../devices/status/domain/StatusId'
import { ModelId } from '../../../model/model/domain/ModelId'
import { MemoryRamCapacity } from '../../memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { MemoryRamValues } from '../../memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { ComputerHDDType } from './ComputerHDDtype'
import { ComputerHDDCapacity } from './ComputerHHDCapacity'
import { ComputerName } from './ComputerName'
import { ComputerOs } from './ComputerOS'
import { ComputerOsArq } from './ComputerOSArq'
import { ComputerProcessor } from './ComputerProcessor'
import { IPAddress } from './IPAddress'
import { MACAddress } from './MACAddress'
import { MemoryRam } from './MemoryRam'

export interface ComputerPrimitives extends DevicePrimitives {
  computerName: Primitives<ComputerName>
  processorId: Primitives<ComputerProcessor>
  memoryRam: Primitives<MemoryRamValues>[],
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  hardDriveCapacityId: Primitives<ComputerHDDCapacity>
  hardDriveTypeId: Primitives<ComputerHDDType>
  operatingSystemId: Primitives<ComputerOs>
  operatingSystemArqId: Primitives<ComputerOsArq>
  macAddress: Primitives<MACAddress>
  ipAddress: Primitives<IPAddress>
}

export class Computer extends Device {
  constructor(
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    categoryId: CategoryId,
    brandId: BrandId,
    modelId: ModelId,
    employeeId: DeviceEmployee,
    locationId: DeviceLocation,
    observation: DeviceObservation,
    stockNumber: DeviceStockNumber,
    private readonly computerName: ComputerName,
    private readonly processorId: ComputerProcessor,
    private readonly memoryRamCapacity: MemoryRamCapacity,
    private readonly memoryRam: MemoryRam,
    private readonly hardDriveCapacityId: ComputerHDDCapacity,
    private readonly hardDriveTypeId: ComputerHDDType,
    private readonly operatingSystemId: ComputerOs,
    private readonly operatingSystemArqId: ComputerOsArq,
    private readonly macAddress: MACAddress,
    private readonly ipAddress: IPAddress
  ) {
    super(serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, stockNumber)

    if (!Computer.isComputerCategory({ categoryId: categoryId.value })) {
      throw new Error('No pertenece a esta categoria')
    }
  }

  static isComputerCategory({ categoryId }: { categoryId: Primitives<CategoryId> }): boolean {
    const AcceptedComputerCategories: CategoryValues[] = ['Computadoras', 'All in One', 'Laptops', 'Servidores']
    return AcceptedComputerCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create(params: ComputerPrimitives) {
    return new Computer(
      new DeviceSerial(params.serial),
      new DeviceActivo(params.activo),
      new StatusId(params.statusId),
      new CategoryId(params.categoryId),
      new BrandId(params.brandId),
      new ModelId(params.modelId),
      new DeviceEmployee(params.employeeId, params.statusId),
      new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
      new DeviceObservation(params.observation),
      new DeviceStockNumber(params.stockNumber, params.statusId),
      new ComputerName(params.computerName, params.statusId),
      new ComputerProcessor(params.processorId, params.statusId),
      new MemoryRamCapacity(params.memoryRamCapacity, params.statusId),
      MemoryRam.fromPrimitives(params.memoryRam, params.statusId),
      new ComputerHDDCapacity(params.hardDriveCapacityId, params.statusId),
      new ComputerHDDType(params.hardDriveTypeId, params.hardDriveCapacityId),
      new ComputerOs(params.operatingSystemId, params.statusId, params.hardDriveCapacityId),
      new ComputerOsArq(params.operatingSystemArqId, params.operatingSystemId),
      new MACAddress(params.macAddress),
      new IPAddress(params.ipAddress, params.statusId)
    )
  }

  computerNameValue(): Primitives<ComputerName> {
    return this.computerName.value
  }
  memoryRamCapacityValue(): Primitives<MemoryRamCapacity> {
    return this.memoryRamCapacity.value
  }
  memoryRamValue(): number[] {
    return this.memoryRam.toPrimitives()
  }
  processorValue(): Primitives<ComputerProcessor> {
    return this.processorId.value
  }
  hardDriveCapacityValue(): Primitives<ComputerHDDCapacity> {
    return this.hardDriveCapacityId.value
  }
  hardDriveTypeValue(): Primitives<ComputerHDDType> {
    return this.hardDriveTypeId.value
  }
  operatingSystemValue(): Primitives<ComputerOs> {
    return this.operatingSystemId.value
  }
  operatingSystemArqValue(): Primitives<ComputerOsArq> {
    return this.operatingSystemArqId.value
  }
  macAddressValue(): Primitives<MACAddress> {
    return this.macAddress.value
  }
  ipAddressValue(): Primitives<IPAddress> {
    return this.ipAddress.value
  }


  toPrimitives(): ComputerPrimitives {
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
      computerName: this.computerNameValue(),
      memoryRamCapacity: this.memoryRamCapacityValue(),
      memoryRam: this.memoryRamValue(),
      processorId: this.processorValue(),
      hardDriveCapacityId: this.hardDriveCapacityValue(),
      hardDriveTypeId: this.hardDriveTypeValue(),
      operatingSystemId: this.operatingSystemValue(),
      operatingSystemArqId: this.operatingSystemArqValue(),
      macAddress: this.macAddressValue(),
      ipAddress: this.ipAddressValue(),
    }
  }
}
