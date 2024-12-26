import { type SitePrimitives } from '../domain/site'
import { SiteRepository } from '../domain/siteRepository'
export class AllSiteGetter {
  constructor (private readonly repository: SiteRepository) {}

  async get (): Promise<SitePrimitives[]> {
    return await this.repository.getAll()
  }
}
