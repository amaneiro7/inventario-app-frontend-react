import { useLocation } from 'react-router-dom'

export function useFindLocation(params: string): boolean {
    const location = useLocation()
    return location.pathname.includes(params)
}