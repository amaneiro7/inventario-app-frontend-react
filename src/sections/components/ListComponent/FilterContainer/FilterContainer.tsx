import { lazy, useEffect, useImperativeHandle, forwardRef, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import './filterContainerStyle.css'

const CloseIcon = lazy(async () => import("../../icon/CloseIcon").then(m => ({ default: m.CloseIcon })))

type Props = React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

export type FilterContainerRef = {
  handleOpen: () => void
}

const Component = ({ children, ...props }: Props, ref: React.Ref<FilterContainerRef>) => {
  const filterContainerRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  useImperativeHandle(ref, () => ({
    handleOpen
  }))

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAndRemoveListener()
      }
    }

    function closeAndRemoveListener() {
      document.removeEventListener('keydown', handleKeyDown)
      handleOpen()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleOpen, open])

  return (
    createPortal(
      <aside
        ref={filterContainerRef}
        className={`filterContainerAside drop-shadow-md shadow-lg ${open ? 'open' : 'close'}`}
        {...props}
      >
        <button
          className='block top-0 left-0 z-30 self-start p-1'
          onClick={handleOpen}
          title='Cerrar panel de filtros'
          tabIndex={1}
          aria-label='Cerrar Filtros'
        >
          <CloseIcon className='w-8 h-8 p-1 text-gray-800/55 rounded-full hover:bg-gray-200 transition-colors' />
        </button>
        <div className='p-1 w-full flex flex-col gap-4 overflow-auto overscroll-contain pr-6'>
          {children}
        </div>
      </aside>, document.body)
  )
}

export const FilterContainer = forwardRef(Component)