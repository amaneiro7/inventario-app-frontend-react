import { type BrandPrimitives, type Brand } from './Brand'
import { type BrandId } from './BrandId'

export abstract class BrandRepository {
  abstract save ({ brand }: { brand: Brand }): Promise<void>

  abstract update ({ id, brand }: { id: BrandId, brand: Brand }): Promise<void>

  abstract getAll (): Promise<BrandPrimitives[]>

  abstract getById ({ id }: { id: BrandId }): Promise<BrandPrimitives | null>
}
