import { Dialog } from '@/sections/mui/Dialog'
import { Slide } from "@mui/material"
import { TransitionProps }from '@mui/material/transitions'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
){
  return <Slide {...props} direction='down' ref={ref} />;
})

export function DialogWrapper({ open, handleClose, children }: React.PropsWithChildren<{
  open: boolean
  handleClose: () => void
}>) {
    return (
      <>
        <Dialog 
          TransitionComponent={Transition}
          open={open} 
          keepMounted 
          onClose={handleClose}
          aria-describedby='form dialog component'
        >
          {children}
        </Dialog>
      </>
    )
}