import { useCallback, useMemo, useState } from "react"
import { type SearchByCriteriaQuery } from "@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery"


export type HandlePage = {
    handleLimitChange: (value: number) => void
    handlePageClick: (event: { selected: number }) => void
    totalPages: number
    showingMessage: string
    currentPage: number
    limit: number
    offset: number
}

type Props = {
    addFilter: (filter: SearchByCriteriaQuery) => void
    limit: number
    offset: number
    total: number
}

export const useHandlePage = ({ addFilter, limit, offset, total }: Props): HandlePage => {
    const initialPage = useMemo(() => offset / limit + 1, [limit, offset])
    const [currentPage, setCurrentPage] = useState(initialPage)
    // Handle the change in the limit.
    const handleLimitChange = useCallback((value: number) => {
        addFilter({ limit: value })
        setCurrentPage(1)
    }, [addFilter])

    // Handle the change in the page.    
    const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit])

    const showingMessage = useMemo(() => {
        const start = offset + 1
        const end = Math.min(offset + limit, total)
        return `Página ${currentPage} - Mostrando ${start} - ${end} de ${total}`
    }, [offset, limit, total, currentPage])

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * limit) % total
        const newPage = event.selected + 1
        console.log(newOffset)
        addFilter({ offset: newOffset })
        setCurrentPage(newPage)
    }

    return {
        handleLimitChange,
        handlePageClick,
        totalPages,
        showingMessage,
        currentPage,
        limit,
        offset
    }
}