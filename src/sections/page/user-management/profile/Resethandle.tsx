import { lazy, Suspense, useRef } from "react"
import { useResetUserPassword } from "@/sections/Hooks/user/useResetPassword"
import { tostPromise } from "@/sections/utils/toaster"
import { type ModalRef } from "@/sections/components/Dialog/Modal"


const Modal = lazy(async () => import("@/sections/components/Dialog/Modal").then(m => ({ default: m.Modal })))
const ConfirmationModal = lazy(async () => import("@/sections/components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const Button = lazy(async () => import("@/sections/components/button/button"))
const ResetIcon = lazy(async () => import("@/sections/components/icon/ResetIcon").then(m => ({ default: m.ResetIcon })))

export function ResetHandle ({id}: {id: string}) {
    const dialogResetRef = useRef<ModalRef>(null)
    const { resetUserPassword } = useResetUserPassword()    
    const handleClose = () => {
        dialogResetRef.current?.handleClose()
    }
    
    const handleOpen = () => {
        dialogResetRef.current?.handleOpen()
    }

    const handleReset = () => {
        tostPromise(resetUserPassword({id}), {
            loading: 'Procesando...',
            success: () => {
                return 'Operacion exitosa'
            },
            error() {                
                return `Ha ocurrido un error`
            },
            description(data) {
                return `${data?.message}`
            },
            duration: 5000,
            onAutoClose: () => {

            },
            onDismiss() {

            },
        })
        handleClose()
    }
    return (
      <>
        <Button 
          color='orange' 
          text='Restablecer Contraseña' 
          onClick={handleOpen}
          buttonSize='medium'
          size='content'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
              <ResetIcon width={16} className='aspect-square' />                      
            </Suspense>
            }
        />
            
        <Modal ref={dialogResetRef}>
          <ConfirmationModal handleClose={handleClose} handle={handleReset} text='¿Está seguro que desea ' strongText='Restablecer la Contraseña?' />
        </Modal>
            
      </>
    )
}