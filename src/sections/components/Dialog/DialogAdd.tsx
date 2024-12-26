import { Dialog } from '../../mui/Dialog'
import { DialogActions } from '../../mui/DialogActions'
import { DialogContent } from '../../mui/DialogContent'
import { DialogContentText } from '../../mui/DialogContentText'
import { Button } from '../../mui/Button'
import { DialogTitle } from '../../mui/DialogTitle'

interface Props {
  title: string
  contextText: string,
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  resetForm: () => void
}

export default function DialogAdd ({        
    title,
    contextText,
    open,
    toggleOpen,
    handleSubmit,
    resetForm,
    children
}: React.PropsWithChildren<Props>) {  
  
  const handleClose = () => {
    resetForm()
    toggleOpen(false)
  }
    return (
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent className='flex flex-col gap-4'>
            <DialogContentText>
              {contextText}
            </DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}