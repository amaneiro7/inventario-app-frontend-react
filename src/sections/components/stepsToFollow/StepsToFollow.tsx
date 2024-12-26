import { lazy } from "react"

const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))
const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))

export function StepsToFollow ({children}: React.PropsWithChildren) {
    return (
      <DetailsWrapper borderColor='orange'>
        <DetailsBoxWrapper>            
          <Paragraph color='black' variant='p' className='font-semibold' text='Pasos a Seguir:' />
          <div className='flex flex-col gap-3'>
            {children}
          </div>
        </DetailsBoxWrapper>
      </DetailsWrapper>
    )
}