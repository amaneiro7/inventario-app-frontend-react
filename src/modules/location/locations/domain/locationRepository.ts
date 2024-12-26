import { Criteria } from '../../../shared/domain/criteria/Criteria';
import { type LocationPrimitives, type Location } from './location'
import { type LocationId } from './locationId'

export abstract class LocationRepository {
  abstract getAll (): Promise<LocationPrimitives[]>

  abstract getById ({ id }: { id: LocationId }): Promise<LocationPrimitives>
  
  abstract getByCriteria (criteria: Criteria): Promise<LocationPrimitives[]>

  abstract save ({ location }: { location: Location }): Promise<void>
  
  abstract update ({ id, location }: { id: LocationId, location: Location }): Promise<void>
}
