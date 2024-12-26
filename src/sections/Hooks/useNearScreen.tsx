import { useRef, useEffect, useState } from 'react'

export const useNearScreen = () => {
    const element = useRef<HTMLTableSectionElement>(null)
    const [show, setShow] = useState(false)
    useEffect(() => {
        const oberver = new window.IntersectionObserver(entries => {
            const { isIntersecting } = entries[0]
            if (isIntersecting) {
                setShow(true)
                oberver.disconnect()
            }
        })
        oberver.observe(element.current)
    },[element])

    return [show, element]
}
