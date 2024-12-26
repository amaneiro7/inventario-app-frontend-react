import { Site, type SitePrimitives } from "../domain/site"
import { SiteId } from "../domain/SiteId"
import { type SiteRepository } from "../domain/siteRepository"

export class SiteCreator {
    constructor(private readonly repository: SiteRepository) { }

    async create(params: SitePrimitives) {
        const site = Site.create(params)

        if (params.id === undefined) {
            return await this.repository.save({ site })
        } else {
            const siteId = new SiteId(params.id)
            return await this.repository.update({ id: siteId, site })
        }
    }
}
