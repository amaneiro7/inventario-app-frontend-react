import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiSiteRepository } from '@/modules/location/site/infraestructure/ApiSiteRepository'
import { AllSiteGetter } from '@/modules/location/site/application/AllSiteGetter'
import { SiteCreator } from '@/modules/location/site/application/SiteCreator'
import { type SitePrimitives } from '@/modules/location/site/domain/site'


export interface UseSites {
    sites: SitePrimitives[]
    loading: boolean
    error: Error | null
    createSite: (site: SitePrimitives) => Promise<void>
}

export const useSite = (): UseSites => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sites, setSites] = useState<SitePrimitives[]>([])

    const repository = useMemo(() => { return new ApiSiteRepository() }, [])


    const fetchData = useCallback(() => {
        setLoading(true)
        new AllSiteGetter(repository)
            .get()
            .then((res) => {
                setSites(res)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [repository])

    const createSite = useCallback(async (formData: SitePrimitives) => {
        return await new SiteCreator(repository).create(formData).then((res) => {
            fetchData()
            return res
        })
    }, [fetchData, repository])

    useEffect(() => {
        fetchData()

        return () => {
            setSites([])
        }
    }, [fetchData])

    return {
        sites,
        loading,
        error,
        createSite
    }
}
