import { useMemo } from 'react'
import { getValueFromQueryParams } from '../../../utils/getValueFromQueryParams'
import { type CategoryId } from '../../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../../modules/devices/brand/domain/BrandId'
import { type StatusId } from '../../../../modules/devices/devices/status/domain/StatusId'
import { type DeviceActivo } from '../../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceSerial } from '../../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type ModelId } from '../../../../modules/devices/model/model/domain/ModelId'
import { type LocationId } from '../../../../modules/location/locations/domain/locationId'
import { type TypeOfSiteId } from '../../../../modules/location/typeofsites/domain/typeOfSiteId'
import { type CityId } from '../../../../modules/location/city/domain/CityId'
import { type StateId } from '../../../../modules/location/state/domain/StateId'
import { type RegionId } from '../../../../modules/location/region/domain/RegionId'
import { type DeviceEmployee } from '../../../../modules/devices/devices/devices/domain/DeviceEmployee'

export interface InputData {
	categoryId: Primitives<CategoryId>
	brandId: Primitives<BrandId>
	statusId: Primitives<StatusId>
	activo: Primitives<DeviceActivo>
	serial: Primitives<DeviceSerial>
	modelId: Primitives<ModelId>
	employeeId: Primitives<DeviceEmployee>
	locationId: Primitives<LocationId>
	typeOfSiteId: Primitives<TypeOfSiteId>
	cityId: Primitives<CityId>
	stateId: Primitives<StateId>
	regionId: Primitives<RegionId>
}

export const defaultInputData = {
	categoryId: '',
	brandId: '',
	statusId: '',
	activo: '',
	serial: '',
	modelId: '',
	employeeId: '',
	locationId: '',
	typeOfSiteId: '',
	cityId: '',
	stateId: '',
	regionId: ''
}
export function useDefaultInitialInputValue(): {
	inputData: InputData
	defaultInputData: InputData
} {
	const defaultInputData = useMemo(() => {
		return {
			categoryId: '',
			brandId: '',
			statusId: '',
			activo: '',
			serial: '',
			modelId: '',
			employeeId: '',
			locationId: '',
			typeOfSiteId: '',
			cityId: '',
			stateId: '',
			regionId: '',
			computerName: '',
			operatingSystemId: '',
			operatingSystemArqId: '',
			processor: '',
			ipAddress: ''
		}
	}, [])

	const getValuesFromQueryParams = useMemo(() => {
		return getValueFromQueryParams(defaultInputData)
	}, [defaultInputData])

	return {
		defaultInputData,
		inputData: { ...defaultInputData, ...getValuesFromQueryParams }
	}
}
