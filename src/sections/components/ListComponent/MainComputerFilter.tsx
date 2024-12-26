import { lazy } from 'react'
import { useDeviceContext } from '../../Context/DeviceProvider'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type EmployeeId } from '../../../modules/employee/employee/domain/EmployeeId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Input = lazy(() => import('../text-inputs/Input').then(m => ({ default: m.Input })))
const EmployeeComboBox = lazy(() => import('../combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(() => import('../combo_box/CategoryComboBox'))
const LocationComboBox = lazy(() => import('../combo_box/LocationComboBox'))
const RegionComboBox = lazy(() => import('../combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))

export function MainComputerFilter({
    handleChange,
    categoryId,
    employeeId,
    locationId,
    regionId,
    serial,
    typeOfSiteId
}: {
    handleChange: OnHandleChange
    employeeId: Primitives<EmployeeId>
    categoryId: Primitives<CategoryId>
    serial: Primitives<DeviceSerial>
    locationId: Primitives<LocationId>
    typeOfSiteId: Primitives<TypeOfSiteId>
    regionId: Primitives<RegionId>
}) {
    const { defaultMainCategory } = useDeviceContext()
    return (
      <>
        <EmployeeComboBox
          name='employeeId'
          value={employeeId}
          onChange={handleChange}
        />
        <CategoryComboBox
          value={categoryId}
          onChange={handleChange}
          mainCategory={defaultMainCategory}
        />
        <Input
          value={serial}
          name='serial'
          type='text'
          label='Serial'
          onChange={(event) => {
            let { value } = event.target
            const { name } = event.target
            value = value.trim().toUpperCase()            
            handleChange(name, value, Operator.CONTAINS)
          }}
        />
        <LocationComboBox
          value={locationId}
          onChange={handleChange}
          typeOfSiteId={typeOfSiteId}
          type='search'
        />
        <RegionComboBox
          value={regionId}
          onChange={handleChange}
          type='search'
        />
      </>
    )
}