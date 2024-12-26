import { useCallback, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export function useManageURL<T extends Function>(fn: T) {
    const [executing, setExecuting] = useState(false)

    const manageURL = useCallback(async () => {
        if (!executing) {
            setExecuting(true)
            await fn()
            setTimeout(() => {
                setExecuting(false)
            }, 2000)
        }
    }, [executing, fn])

    return manageURL
}