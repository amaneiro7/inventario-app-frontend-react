import { makeRequest } from '../../../shared/infraestructure/fetching'
import { Site, type SitePrimitives } from '../domain/site'
import { type SiteRepository } from '../domain/siteRepository'
import { type SiteId } from '../domain/SiteId'

export class ApiSiteRepository implements SiteRepository {
  private readonly url: string = 'sites'
  async getAll(): Promise<SitePrimitives[]> {
    return await makeRequest({ method: 'GET', url: this.url })
  }

  async getById({ id }: { id: SiteId }): Promise<SitePrimitives> {
    return await makeRequest({ method: 'GET', url: `${this.url}/${id.value}` })
  }

  async save({ site }: { site: Site }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: site.toPrimitives() })
  }

  async update({ id, site }: { id: SiteId, site: Site }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: site.toPrimitives() })
  }
}
