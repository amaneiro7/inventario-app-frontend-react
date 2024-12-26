import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type ModelPrimitives, type Model } from './Model'
import { type ModelId } from './ModelId'

export abstract class ModelRepository {
  abstract save({ model }: { model: Model }): Promise<void>

  abstract update({ id, model }: { id: ModelId, model: Model }): Promise<void>

  abstract getAll(): Promise<ModelPrimitives[]>

  abstract getByCriteria(criteria: Criteria): Promise<{ total: number; data: ModelPrimitives[] }>

  abstract getById({ id }: { id: ModelId }): Promise<ModelPrimitives | null>

  abstract download(criteria: Criteria): Promise<void>
}
