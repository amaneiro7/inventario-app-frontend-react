import { lazy, Suspense, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Loading from "@/sections/components/Loading"

const PageTitle = lazy(async () => import("@/sections/components/Typography/PageTitle"))
const DetailsWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsBoxWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsBoxWrapper"))
const Subtitle = lazy(async () => import("@/sections/components/Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("@/sections/components/Typography/Paragraph").then(m => ({ default: m.Paragraph })))
const RegisterEditStepsToFollow = lazy(async () => import("@/sections/components/stepsToFollow/RegisterEditStepsToFollow").then(m => ({ default: m.RegisterEditStepsToFollow })))
const ProfileStepsToFollow = lazy(async () => import("@/sections/components/stepsToFollow/ProfileStepsToFollow").then(m => ({ default: m.ProfileStepsToFollow })))
const StepsToFollow =lazy (async () => import("@/sections/components/stepsToFollow/StepsToFollow").then(m => ({ default: m.StepsToFollow })))
const AddIcon =lazy (async () => import("@/sections/components/icon/AddIcon").then(m => ({ default: m.AddIcon })))
const SearchSection = lazy(async () => import("@/sections/components/formContainer/SearchSection").then(m => ({ default: m.SearchSection })))
const UsersSearchComboBox = lazy(async () => import("@/sections/components/combo_box/UsersSearchComboBox").then(m => ({ default: m.UsersSearchComboBox })))


export default function UserManagement() {  
    const location = useLocation()
    const pageIs = useMemo(() => {
      if (location.pathname.includes('register')) return 'register'
      if (location.pathname.includes('profile')) return 'profile'
      if (location.pathname.includes('edit')) return 'edit'
      return null
    }, [location.pathname])

    const subtitle = useMemo(() => {
      if (pageIs === 'register') return '- Registrar nuevo usuario'
      if (pageIs === 'edit') return '- Editar usuario'
      if (pageIs === 'profile') return '- Información del usuario'
      return ''
    }, [pageIs])

    const desc = useMemo(() => {
      if (pageIs !== 'register') return ' o registre un nuevo usuario presionando el boton'
      return ''
    }, [pageIs])
    return (
      <Suspense fallback={<Loading />}>
          <PageTitle title='Gestión de usuarios' />
          <DetailsWrapper borderColor='blue'>
            <DetailsBoxWrapper>
              <Subtitle variant='h3' color='blue' text={`Gestión de usuarios ${subtitle}`} />
              <p className='inline-flex gap-1 text-center justify-center items-center '>
                <Paragraph color='gray' variant='span' text={`Ingrese el correo del usuario que desea visualizar, editar, restablecer contraseña o eliminar${desc}.`} />
                {pageIs !== 'register' ? <Suspense><Paragraph color='white' variant='span' text='Agregar nuevo' backgroundColor='orange' icon={<AddIcon width={16} />} /></Suspense> : null}
              </p>
              <SearchSection
                key={location.key}
                searchInput={<UsersSearchComboBox />}
                url='/user-management/register'
                isEdit={pageIs !== 'register'}
              />
            </DetailsBoxWrapper>
            <Outlet />          
          </DetailsWrapper>
          {pageIs ? 
            <StepsToFollow>
              {(pageIs === 'register' || pageIs === 'edit') ? <Suspense><RegisterEditStepsToFollow /></Suspense>: null}
              {(pageIs === 'profile') ? <Suspense><ProfileStepsToFollow /></Suspense> : null}
            </StepsToFollow> 
          : null} 
      </Suspense>
    )
}