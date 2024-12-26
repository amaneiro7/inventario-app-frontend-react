import { type FiltersPrimitives } from '../../domain/criteria/Filter'
import { type Limit } from '../../domain/criteria/Limit'
import { type Offset } from '../../domain/criteria/Offset'
import { type OrderBy } from '../../domain/criteria/OrderBy'
import { type OrderType } from '../../domain/criteria/OrderType'
import { type Primitives } from '../../domain/value-object/Primitives'
import { type Query } from './Query'

export class SearchByCriteriaQuery implements Query {
  constructor (
    public filters?: FiltersPrimitives[],
    public orderBy?: Primitives<OrderBy>,
    public orderType?: Primitives<OrderType>,
    public limit?: Primitives<Limit>,
    public offset?: Primitives<Offset>
  ) {}
}
