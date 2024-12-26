import { Toaster, toast } from 'sonner'

export const ToasterComponent = () => {
  return (
    <Toaster
      closeButton
      expand={false}
      position='bottom-right'
      richColors
    />
  )
}
export const tostPromise = toast.promise
