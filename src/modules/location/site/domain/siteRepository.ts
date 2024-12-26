import { type Site, type SitePrimitives } from './site'
import { type SiteId } from './SiteId';

export abstract class SiteRepository {
  abstract getAll(): Promise<SitePrimitives[]>

  abstract getById({ id }: { id: SiteId }): Promise<SitePrimitives>

  abstract save({ site }: { site: Site }): Promise<void>

  abstract update({ id, site }: { id: SiteId, site: Site }): Promise<void>
}
