import { useCallback, useEffect, useState } from 'react'
import { HistoryPrimitives } from '../../../modules/history/domain/history'
import { AllHistoryGetter } from '../../../modules/history/application/AllHistoryGetter'
import { ApiHistoryRepository } from '../../../modules/history/infraestructure/ApiHistoryRepository'

export interface UseHistory {
    histories: HistoryPrimitives[]
    loading: boolean
    error: string | null
}

export const useHistory = (): UseHistory => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [histories, setHistory] = useState<HistoryPrimitives[]>([])

    const getHistory = useCallback(() => {
        setLoading(true)
        new AllHistoryGetter(new ApiHistoryRepository())
            .get()
            .then((res) => {
                setHistory(res)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        getHistory()

        return () => {
            setHistory([])
        }
    }, [getHistory])

    return {
        histories,
        loading,
        error
    }
}
