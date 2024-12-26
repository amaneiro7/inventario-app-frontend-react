import { SitePrimitives } from "../domain/site"
import { SiteId } from "../domain/SiteId"
import { SiteRepository } from "../domain/siteRepository"

export class SiteGetter {
  constructor(private readonly repository: SiteRepository) { }

  async getById(id: string): Promise<SitePrimitives> {
    const siteId = new SiteId(id)
    return await this.repository.getById({ id: siteId })
  }
}
