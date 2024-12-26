import { useCallback } from 'react'

import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { SiteId } from '@/modules/location/site/domain/SiteId';
import { SitePrimitives } from '@/modules/location/site/domain/site';
import { SiteGetter } from '@/modules/location/site/application/SiteGetter';
import { ApiSiteRepository } from '@/modules/location/site/infraestructure/ApiSiteRepository';


export const useGetSite = (): {
    getDevice: ({ id }: {
        id: Primitives<SiteId>;
    }) => Promise<SitePrimitives>
} => {
    return {
        getDevice: useCallback(async ({ id }: { id: Primitives<SiteId> }) => {
            return await new SiteGetter(new ApiSiteRepository()).getById(id)
        }, [])
    }
}
