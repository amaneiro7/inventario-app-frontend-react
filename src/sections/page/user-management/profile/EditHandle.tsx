import { lazy, Suspense } from "react"

const LinkAsButton = lazy(async () => import("@/sections/components/button/LinkAsButton").then(m => ({ default: m.LinkAsButton })))
const EditIcon = lazy(async () => import("@/sections/components/icon/EditIcon").then(m => ({ default: m.EditIcon })))
export function EditHandle ({ id }: {id: string}) {
    return (
      <LinkAsButton
        actionType='CLOSE'
        text='Editar'
        url={`/user-management/edit/${id}`}
        buttonSize='medium'
        icon={
          <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
            <EditIcon width={16} className='aspect-square ' />                      
          </Suspense>
        }
      />
    )
}