import { lazy } from 'react'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type StateId } from '../../../modules/location/state/domain/StateId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type RegionId } from '../../../modules/location/region/domain/RegionId'
import { type CityId } from '../../../modules/location/city/domain/CityId'

const Input = lazy(async () => import("../text-inputs/Input").then(m => ({ default: m.Input })))
const StatusComboBox = lazy(() => import('../combo_box/StatusComboBox'))
const BrandComboBox = lazy(() => import('../combo_box/BrandComboBox'))
const ModelComboBox = lazy(() => import('../combo_box/ModelComboBox'))
const CityComboBox = lazy(() => import('../combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const StateComboBox = lazy(() => import('../combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))

export function DefaultFilterSection ({
    activo,
    statusId,
    brandId,
    modelId,
    categoryId,
    stateId,
    regionId,
    cityId,
    handleChange
}: {
    activo: Primitives<DeviceActivo>
    statusId: Primitives<StateId>
    brandId: Primitives<BrandId>
    modelId: Primitives<ModelId>
    categoryId: Primitives<CategoryId>
    stateId: Primitives<StateId>
    regionId: Primitives<RegionId>
    cityId: Primitives<CityId>
    handleChange: (name: string, value: string, operator?: Operator) => void
}) {
    return (
      <>
        <Input
          value={activo}
          name='activo'
          type='text'
          label='Activo'
          onChange={(event) => {
            let { value } = event.target
            const { name } = event.target
            value = value.trim().toUpperCase()            
            handleChange(name, value, Operator.CONTAINS)
            }}
        />
        <StatusComboBox
          value={statusId}
          onChange={handleChange}
          type='search'
        />
        <BrandComboBox
          value={brandId}
          onChange={handleChange}
          type='search'
        />
        <ModelComboBox
          value={modelId}
          brandId={brandId}
          categoryId={categoryId}
          onChange={handleChange}
          type='search'
        />
        <StateComboBox
          value={stateId}
          region={regionId}
          onChange={handleChange}
          type='search'
        />        
        <CityComboBox
          value={cityId}
          state={stateId}
          region={regionId}
          onChange={handleChange}
          type='search'
        />
      </>
    )
}