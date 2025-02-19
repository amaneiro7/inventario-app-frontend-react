import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useCloseNavOnRouteChangeOrEscpae(
	ref: React.RefObject<HTMLInputElement>
) {
	const location = useLocation()

	useEffect(() => {
		function closeNavToggle() {
			if (ref?.current) {
				ref.current.checked = false
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeNavToggle()
			}
		}

		closeNavToggle()

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [location.pathname, ref])
}
