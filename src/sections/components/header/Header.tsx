import { lazy, memo, Suspense, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "@/sections/Context/AuthContext"
import { User } from "@/modules/user/user/domain/User"

import { type UserApiResponse } from "@/modules/shared/domain/types/responseTypes"
import { type ModalRef } from "../Dialog/Modal"

const ConfirmationModal = lazy(async () => import("../Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const LogoutIcon = lazy(() => import("../icon/LogoutIcon").then(m => ({ default: m.LogoutIcon })))
const Nav = lazy(async () => import("./Nav").then((m) => ({ default: m.Nav })))
const WelcomeTitle = lazy(async () => import("./WelcomeTitle").then((m) => ({ default: m.WelcomeTitle })))
const HamburgerMenu = lazy(async () => import("./HamburgerMenu").then((m) => ({ default: m.HamburgerMenu })))
const WrapperBox = lazy(async () => import("./WrapperBox").then((m) => ({ default: m.WrapperBox })))
const Logo = lazy(async () => import("../Logo/Logo"))
const Button = lazy(async () => import("../button/button"))
const Modal = lazy(async () => import('../Dialog/Modal').then(m => ({ default: m.Modal })))

export const Header = memo(function () {  
  const location = useLocation()
  const dialogExitRef = useRef<ModalRef>(null)

  const { useAuth: { logout, user: userDefault } } = useAuthContext()
  const { user } = userDefault as unknown as UserApiResponse
  
   return (
     <>
       <header className='min-h-16 h-16 md:text-sm md:border-none gap-4 flex items-center justify-between md:top-0 md:sticky z-50 bg-secondary w-full shadow-lg pr-8 py-4 overflow-visible'>
         <div className='pl-8 pr-4 p-1 bg-white rounded-e-full'>
          
           <Logo />
          
         </div>

         <WelcomeTitle user={user} />        

         <div className='flex flex-1 gap-8 items-center justify-end'>
           {User.isSuperAdmin({ roleId: user?.roleId }) &&
             <Link to='/user-management' className='text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-primary hover:border-primary transition-colors duration-200'>Gestión de Usuarios</Link>}

           {/* <Link to='/dashboard' className='text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-primary hover:border-primary transition-colors duration-200'>Dashboard</Link> */}
           <Link to='/profile' className='text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-primary hover:border-primary transition-colors duration-200'>Perfil</Link>

           <Button
             aria-label='Botón para cerrar sesión del usuario'
             role='logout'
             color='orange'
             size='content'
             text='Salir'
             onClick={() => dialogExitRef.current?.handleOpen()}
             type='button'
             buttonSize='medium'
             icon={<LogoutIcon width={20} className='aspect-square' />}
           />
         </div>
         <div className='hamburger-wrapper'>
           <HamburgerMenu key={location.key} />
           <WrapperBox />
           <Nav />
         </div>
       </header>
       <Suspense>
         <Modal ref={dialogExitRef}>
           <ConfirmationModal handleClose={() => dialogExitRef.current?.handleClose()} handle={logout} text='¿Está seguro que desea ' strongText='Cerrar la Sesión?' />
         </Modal>
       </Suspense>
     </>
   )
})