import { type BrandPrimitives } from '../../../devices/brand/domain/Brand'
import { type BrandId } from '../../../devices/brand/domain/BrandId'
import { type BrandName } from '../../../devices/brand/domain/BrandName'
import { type CategoryPrimitives } from '../../../devices/category/domain/Category'
import { type CategoryId } from '../../../devices/category/domain/CategoryId'
import { type CategoryName } from '../../../devices/category/domain/CategoryName'
import { type DevicePrimitives } from '../../../devices/devices/devices/domain/Device'
import { type DeviceActivo } from '../../../devices/devices/devices/domain/DeviceActivo'
import { type DeviceId } from '../../../devices/devices/devices/domain/DeviceId'
import { type DeviceObservation } from '../../../devices/devices/devices/domain/DeviceObservation'
import { type DeviceSerial } from '../../../devices/devices/devices/domain/DeviceSerial'
import { type StatusPrimitives } from '../../../devices/devices/status/domain/Status'
import { type StatusId } from '../../../devices/devices/status/domain/StatusId'
import { type StatusName } from '../../../devices/devices/status/domain/StatusName'
import { type ComputerPrimitives } from '../../../devices/fetures/computer/domain/Computer'
import { type HardDrivePrimitives } from '../../../devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { type HardDriveCapacityPrimitives } from '../../../devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacity'
import { type HardDriveTypePrimitives } from '../../../devices/fetures/hardDrive/hardDriveType/domain/HardDriveType'
import { type OperatingSystemPrimitives } from '../../../devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem'
import { type OperatingSystemArqPrimitives } from '../../../devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq'
import { type ProcessorPrimitives } from '../../../devices/fetures/processor/domain/Processor'
import { type InputTypePrimitives } from '../../../devices/model/InputType/domain/InputType'
import { type ModelPrimitives } from '../../../devices/model/model/domain/Model'
import { type ModelId } from '../../../devices/model/model/domain/ModelId'
import { type ModelName } from '../../../devices/model/model/domain/ModelName'
import { type EmployeePrimitives } from '../../../employee/employee/domain/Employee'
import { type EmployeeId } from '../../../employee/employee/domain/EmployeeId'
import { type EmployeeUserName } from '../../../employee/employee/domain/UserName'
import { type ModelKeyboardPrimitives } from '../../../devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard'
import { type ModelLaptopPrimitives } from '../../../devices/model/ModelCharacteristics/modelLaptop/ModelLaptop'
import { type ModelMonitorPrimitives } from '../../../devices/model/ModelCharacteristics/modelMonitor/ModelMonitor'
import { type ModelPrinterPrimitives } from '../../../devices/model/ModelCharacteristics/modelPrinter/ModelPrinter'
import { type ModelComputerPrimitives } from '../../../devices/model/ModelCharacteristics/modelComputer/ModelComputer'
import { type CityPrimitives } from '../../../location/city/domain/city'
import { type RegionPrimitives } from '../../../location/region/domain/region'
import { type SitePrimitives } from '../../../location/site/domain/site'
import { type StatePrimitives } from '../../../location/state/domain/state'
import { type TypeOfSitePrimitives } from '../../../location/typeofsites/domain/typeOfSite'
import { type UserPrimitives } from '../../../user/user/domain/User'
import { type LocationPrimitives } from '../../../location/locations/domain/location'
import { type LocationId } from '../../../location/locations/domain/locationId'
import { type Primitives } from '../value-object/Primitives'
import { type HistoryPrimitives } from '../../../history/domain/history'
import { type RoleId } from '../../../user/role/domain/RoleId'
import { type DeviceStockNumber } from '../../../devices/devices/devices/domain/DeviceStockNumber'
import { type MFPPrimitives } from '@/modules/devices/fetures/multiFunctionalPrinter/MFP'

interface UserApiResponse {
  user: UserApiResponsePrimitives
  message: string
  refreshToken: string
  roleId: Primitives<RoleId>
  role: {
    id: Primitives<RoleId>
    name: string
  }
}

export interface UserApiResponsePrimitives extends UserPrimitives {
  role: {
    id: Primitives<RoleId>
    name: string
  }
}

export interface CategoryApiResponse extends CategoryPrimitives {
  mainCategory: CategoryPrimitives
}

export interface DevicesApiResponse extends DevicePrimitives {
  createdAt: string
  updatedAt: string
  category: CategoryApiResponse
  brand: BrandPrimitives
  model: ModelApiresponse
  location: LocationPrimitives
  employee: EmployeePrimitives | null
  status: StatusPrimitives
  computer: Computer | null
  hardDrive: HardDrive | null
  mfp: MFP | null
  history: HistoryApiResponse[]
}

export interface HistoryApiResponse extends HistoryPrimitives {
  employee: EmployeePrimitives
  user: Pick<UserPrimitives, 'email' | 'name' | 'lastName'>
  createdAt: string
  updatedAt: string
}

export interface EmployeesApiResponse extends EmployeePrimitives {
  createdAt: string
  updatedAt: string
  devices: DevicesApiResponse[]
}

export interface EmployeeMappedApiResponse extends EmployeePrimitives {
  createdAt: string
  updatedAt: string
  devices?: DevicePrimitives[]
}
export interface EmployeeDevicesMappedApiResponse extends EmployeePrimitives {
  createdAt: string
  updatedAt: string
  computers: DevicesApiResponse[]
  monitores: DevicesApiResponse[]
}

export interface DevicesMappedApiResponse {
  id: Primitives<DeviceId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  categoryName: Primitives<CategoryName>
  brandId: Primitives<BrandId>
  brandName: Primitives<BrandName>
  statusName: Primitives<StatusName>
  modelId: Primitives<ModelId>
  modelName: Primitives<ModelName>
  observation: Primitives<DeviceObservation>
  stockNumber: Primitives<DeviceStockNumber>
  locationId: Primitives<LocationId>
  locationName: string
  employeeId: Primitives<EmployeeId> | null
  employeeUserName: Primitives<EmployeeUserName>
  computer: Computer | null
  hardDrive: HardDrive | null
  createdAt: string
  updatedAt: string
}
export interface BrandApiResponse extends BrandPrimitives {
  id: Primitives<BrandId>
  createdAt: string
  updatedAt: string
  model: ModelPrimitives[]
}

export interface ModelApiresponse extends ModelPrimitives {
  id: Primitives<ModelId>
  createdAt: string
  updatedAt: string
  category: CategoryPrimitives
  brand: BrandPrimitives
  modelPrinter: ModelPrinter
  modelMonitor: ModelMonitor
  modelComputer: ModelComputer
  modelLaptop: ModelLaptop
  modelKeyboard: ModelKeyboard
}

export interface ModelComputer extends ModelComputerPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelLaptop extends ModelLaptopPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}

export type ModelPrinter = ModelPrinterPrimitives

export type ModelMonitor = ModelMonitorPrimitives
export interface ModelKeyboard extends ModelKeyboardPrimitives {
  inputType: InputTypePrimitives
}


export interface Computer extends ComputerPrimitives {
  deviceId: Primitives<DeviceId>
  createdAt: string
  updatedAt: string
  processor: ProcessorApiresponse
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
  operatingSystem: OperatingSystemPrimitives
  operatingSystemArq: OperatingSystemArqPrimitives
}

export interface BrandApiResponse extends BrandPrimitives {
  createdAt: string
  updatedAt: string
}
export interface ProcessorApiresponse extends ProcessorPrimitives {
  createdAt: string
  updatedAt: string
}

export interface LocationApiResponse extends LocationPrimitives {
  id: Primitives<LocationId>
  typeOfSite: TypeOfSitePrimitives
  site: SiteApiResponse
}

export interface SiteApiResponse extends SitePrimitives {
  city: CityApiResponse
}

export interface CityApiResponse extends CityPrimitives {
  state: StateApiResponse
}

export interface StateApiResponse extends StatePrimitives {
  region: RegionPrimitives
}

export interface HardDrive extends HardDrivePrimitives {
  id: Primitives<HardDriveId>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  createdAt: string
  updatedAt: string
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
}

export type MFP = MFPPrimitives
