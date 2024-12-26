import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type BrandId } from './BrandId'
import { BrandName } from './BrandName'

export interface BrandPrimitives {
  id?: Primitives<BrandId>
  name: Primitives<BrandName>
}
export class Brand {
  constructor (
    private readonly name: BrandName
  ) {}

  public static create ({ name }: BrandPrimitives): Brand {
    return new Brand(new BrandName(name))
  }

  nameValue (): Primitives<BrandName> {
    return this.name.value
  }

  toPrimitives (): BrandPrimitives {
    return {
      name: this.nameValue()
    }
  }
}
