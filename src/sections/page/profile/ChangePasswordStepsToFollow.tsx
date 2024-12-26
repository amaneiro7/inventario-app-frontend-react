import { lazy, Suspense } from "react"

const RightArrowIcon = lazy(async () => import("../../components/icon/RightArrowIcon").then(m => ({ default: m.RightArrowIcon })))
const CancelIcon = lazy(async () => import("../../components/icon/CancelIcon").then(m => ({ default: m.CancelIcon })))
const StepsText = lazy(async () => import("../../components/stepsToFollow/StepsText").then(m => ({ default: m.StepsText })))

export function ChangePasswordStepsToFollow() {
  return (
    <>
      <StepsText
        requisito='obligatorio'
        text='Ingrese su Clave Actual, su Nueva Clave y una Confirmación de la misma, si es correcto, oprima '
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
        iconText='Reset'
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
