import { Criteria } from '@/modules//shared/domain/criteria/Criteria'
import { Filter } from '@/modules//shared/domain/criteria/Filter'
import { FilterField } from '@/modules//shared/domain/criteria/FilterField'
import { FilterOperator } from '@/modules//shared/domain/criteria/FilterOperators'
import { Filters } from '@/modules//shared/domain/criteria/Filters'
import { FilterValue } from '@/modules//shared/domain/criteria/FilterValue'
import { Limit } from '@/modules//shared/domain/criteria/Limit'
import { Order } from '@/modules//shared/domain/criteria/Order'
import { type DeviceRepository } from '../domain/DeviceRepository'
import { type SearchByCriteriaQuery } from '@/modules//shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type Source } from '@/modules/shared/domain/types/types'

export class DeviceDownload {
	constructor(private readonly repository: DeviceRepository) {}
	async exec(query: SearchByCriteriaQuery, source: Source): Promise<void> {
		const filters =
			query.filters.length > 0 &&
			query.filters.map(filter => {
				return new Filter(
					new FilterField(filter.field),
					FilterOperator.fromValue(filter.operator),
					new FilterValue(filter.value)
				)
			})
		const order = Order.fromValues(query.orderBy, query.orderType)
		const limit = new Limit(query.limit)
		const offset = new Limit(query.offset)
		const criteria = new Criteria(
			new Filters(filters),
			order,
			limit,
			offset
		)

		return await this.repository.download(criteria, source)
	}
}
