import { type Primitives } from '../value-object/Primitives'
import { FilterField } from './FilterField'
import { FilterOperator } from './FilterOperators'
import { FilterValue } from './FilterValue'

export interface FiltersPrimitives {
  field: Primitives<FilterField>
  operator: string
  value: Primitives<FilterValue>
}

export class Filter {
  constructor (
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue
  ) {}

  // Esto es simplemente otra forma de instanciar nuestra clase
  // La usamos cuando queremos hacer logica extra en nuestra instanciación
  static fromValues (values: Map<string, string>): Filter {
    const field = values.get('field')
    const operator = values.get('operator')
    const value = values.get('value')

    if (field === undefined || operator === undefined || value === undefined) {
      throw new Error('The filter is invalid')
    }

    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    )
  }

  toPrimitives (): FiltersPrimitives {
    return {
      field: this.field.value,
      operator: this.operator.value,
      value: this.value.value
    }
  }
}
