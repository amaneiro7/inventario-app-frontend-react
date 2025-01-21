import {
	makeDownloadRequest,
	makeRequest
} from '../../../../shared/infraestructure/fetching'
import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type Source } from '@/modules/shared/domain/types/types'
import { type ModelApiresponse } from '../../../../shared/domain/types/responseTypes'
import { type ModelPrimitives, type Model } from '../domain/Model'
import { type ModelId } from '../domain/ModelId'
import { type ModelRepository } from '../domain/ModelRepository'

export class ApiModelRepository implements ModelRepository {
	private readonly url: string = 'models'
	async save({ model }: { model: Model }): Promise<void> {
		return await makeRequest({
			method: 'POST',
			url: this.url,
			data: model.toPrimitives()
		})
	}

	async update({ id, model }: { id: ModelId; model: Model }): Promise<void> {
		return await makeRequest({
			method: 'PATCH',
			url: `${this.url}/${id.value}`,
			data: model.toPrimitives()
		})
	}

	async getAll(): Promise<ModelPrimitives[]> {
		return await makeRequest<ModelApiresponse[]>({
			method: 'GET',
			url: `${this.url}/all`
		})
	}

	async getByCriteria(
		criteria: Criteria
	): Promise<{ total: number; data: ModelPrimitives[] }> {
		const criteriaPrimitives = criteria.toPrimitives()

		const queryParams = criteria.buildQuery(criteriaPrimitives)
		return await makeRequest({
			method: 'GET',
			url: `${this.url}?${queryParams}`
		})
	}

	async getById({ id }: { id: ModelId }): Promise<ModelPrimitives | null> {
		return await makeRequest({
			method: 'GET',
			url: `${this.url}/${id.value}`
		})
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
}
