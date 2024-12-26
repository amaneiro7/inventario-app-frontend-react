import { useRef, useEffect } from 'react'

export function useEffectAfterMount<DEPS>(
    fn: () => void,
    deps: DEPS[] = []
) {
    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        fn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}