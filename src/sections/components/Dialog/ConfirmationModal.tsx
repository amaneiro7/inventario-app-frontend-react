import { lazy, Suspense } from "react"
const Button= lazy(async () => import("../button/button"))
const CheckIcon = lazy(async () => import("../icon/CheckIcon").then(m => ({ default: m.CheckIcon })))
const CancelIcon= lazy(async () => import("../icon/CancelIcon").then(m => ({ default: m.CancelIcon })))

interface Props {
    text: string
    strongText?: string
    handle?: () => void
    formId?: string
    handleClose: () => void
}

export function ConfirmationModal ({ text, strongText, handle, handleClose, formId }: Props) {
    return (
      <>
        <div className='bg-secondary text-white p-4 rounded-t'>
          <p>Confirmación</p>
        </div>
        <div className='p-4'>
          <p>{text}<strong>{strongText}</strong></p>
          <div className='mt-6 flex gap-4 justify-end'>
            <Button
              form={formId}
              color='blue'
              type={!handle ? 'submit' : 'button'}
              onClick={handle}
              text='Si'
              buttonSize='large'
              size='content'
              hoverTranslation
              icon={
                <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                  <CheckIcon width={20} className='aspect-square stroke-[3]' />
                </Suspense>
                  }
            />
            <Button
              type='button'
              color='red'
              text='No'
              buttonSize='large'
              size='content'
              onClick={handleClose}
              hoverTranslation
              icon={
                <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                  <CancelIcon width={20} className='aspect-square' />
                </Suspense>
                  }
            />
          </div>
        </div>
      </>
    )
}