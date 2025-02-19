import { lazy, memo } from 'react'
import { Link } from 'react-router-dom'
import { titleLogo } from '@/modules/shared/infraestructure/config'
import './Logo.css'

const LazyLogoImage = lazy(async () =>
	import('../lazyImages/LazyLogoImage').then(m => ({
		default: m.LazyLogoImage
	}))
)

function Logo() {
	return (
		<Link
			className="mx-auto"
			aria-label="Logo"
			aria-describedby="Logo y un enlace al inicio de la página"
			to="/"
		>
			<div className="Logo flex gap-2 divide-x-2 divide-secondary-900 items-center">
				<LazyLogoImage className="max-w-11 bg-contain mdlg:w-24 lg:w-28 clear-none" />
				<h1 className="pl-2 hidden mdlg:flex flex-col font-semibold text-secondary dark:text-white">
					Soporte Tecnico
					<span className="text-secondary-950/80">
						{`${titleLogo}`}
					</span>
				</h1>
			</div>
		</Link>
	)
}

export default memo(Logo)
