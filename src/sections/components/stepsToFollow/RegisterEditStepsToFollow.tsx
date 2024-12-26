import { lazy, Suspense } from "react"

const RightArrowIcon = lazy(async () => import("../icon/RightArrowIcon").then(m => ({ default: m.RightArrowIcon })))
const CancelIcon = lazy(async () => import("../icon/CancelIcon").then(m => ({ default: m.CancelIcon })))
const StepsText = lazy(async () => import("./StepsText").then(m => ({ default: m.StepsText })))

export function RegisterEditStepsToFollow() {
  return (
    <>
      <StepsText 
        requisito='obligatorio' 
        text='Ingrese el Nombre, el Apellido, el correo electrónico y el cargo del usuario, si es correcto, oprima ' 
        iconText='Continuar' 
        icon={
          <Suspense fallback={<span className='w-4 h-4 rounded-full bg-slate-200 animate-pulse' />}>
            <RightArrowIcon width={16} className='fill-white' />
          </Suspense>
        } 
        backgroundColor='green'
      />
      <StepsText 
        requisito='opcional' 
        text='Si desea abortar la operación, oprima ' 
        iconText='Cancelar' 
        icon={
          <Suspense fallback={<span className='w-4 h-4 rounded-full bg-slate-200 animate-pulse' />}>
            <CancelIcon width={16} />
          </Suspense>
        } 
        backgroundColor='gray'
      />
    </>
  )
}
