import {
	makeDownloadRequest,
	makeRequest
} from '../../../../shared/infraestructure/fetching'
import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'
import { type Source } from '@/modules/shared/domain/types/types'

export class ApiDeviceRepository implements DeviceRepository {
	private readonly url: string = 'devices'
	async save({ device }: { device: Device }): Promise<void> {
		return await makeRequest({
			method: 'POST',
			url: this.url,
			data: device.toPrimitives()
		})
	}

	async update({
		id,
		device
	}: {
		id: DeviceId
		device: Device
	}): Promise<void> {
		return await makeRequest({
			method: 'PATCH',
			url: `${this.url}/${id.value}`,
			data: device.toPrimitives()
		})
	}

	async getByCriteria(
		criteria: Criteria
	): Promise<{ total: number; data: DevicePrimitives[] }> {
		const criteriaPrimitives = criteria.toPrimitives()
		const queryParams = criteria.buildQuery(criteriaPrimitives)
		return await makeRequest<{ total: number; data: DevicesApiResponse[] }>(
			{ method: 'GET', url: `${this.url}?${queryParams}` }
		)
	}

	async download(criteria: Criteria, source: Source): Promise<void> {
		const criteriaPrimitives = criteria.toPrimitives()
		const queryParams = criteria.buildQuery(criteriaPrimitives)
		return await makeDownloadRequest(
			{
				method: 'GET',
				url: `${this.url}/download?${queryParams}`
			},
			source
		)
	}

	async getAll(): Promise<DevicePrimitives[]> {
		return await makeRequest<DevicesApiResponse[]>({
			method: 'GET',
			url: this.url
		})
	}

	async getById({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
		return await makeRequest<DevicesApiResponse>({
			method: 'GET',
			url: `${this.url}/${id.value}`
		})
	}
}
