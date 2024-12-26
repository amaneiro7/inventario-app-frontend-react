import { InvalidArgumentError } from '../value-object/InvalidArgumentError'
import { type Filter } from './Filter'
import { type Filters } from './Filters'
import { type Limit } from './Limit'
import { type Offset } from './Offset'
import { type Order } from './Order'

interface CriteriaPrimitives {
  filters: Filter[]
  orderBy: string
  orderType: string
  limit: number
  offset: number
}

export class Criteria {
  constructor (
    public readonly filters?: Filters,
    public readonly order?: Order,
    public readonly limit?: Limit,
    public readonly offset?: Offset
  ) {
    if (offset !== undefined && limit === undefined) {
      throw new InvalidArgumentError('Limit must be defined if offset is defined')
    }
  }

  toPrimitives (): CriteriaPrimitives {
    return {
      filters: this.filters?.value,
      orderBy: this.order?.orderBy.value,
      orderType: this.order?.orderType.value,
      limit: this.limit?.value,
      offset: this.offset?.value
    }
  }

  hasFilters (): boolean {
    return !this.filters.isEmpty()
  }

  hasOrder (): boolean {
    return this.order.hasOrder()
  }

  buildQuery(criteria: CriteriaPrimitives): string {    

    const filters = criteria.filters.length > 0 && criteria.filters.map(
      (filter, index) => {
        const { field, operator, value } = filter.toPrimitives()
        return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
      }
    )
    const paramsLimitAndOffset = criteria.limit ? `limit=${criteria.limit}&offset=${criteria.offset}` : undefined
    const paramsOrder = criteria.orderBy ? `orderBy=${criteria.orderBy}&orderType=${criteria.orderType}` : undefined
    const paramsFilters = filters ? `${filters.join('&')}` : undefined
    const queryParams = [paramsFilters, paramsLimitAndOffset, paramsOrder].join('&')
    return queryParams
  }
}
