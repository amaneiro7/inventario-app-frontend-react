import { Link, LinkProps } from "react-router-dom"

interface Props {    
    text: string
    className?: string
    state?: LinkProps['state']
    actionType: keyof typeof ACTIONTYPE
    url: string
    icon?: JSX.Element
    size? : keyof typeof SIZE
    buttonSize: keyof typeof BUTTONSIZE
    hoverTranslate?: boolean
  }

  const SIZE = {
    full: 'w-full',
    content: 'w-max',  
  } as const
  const BUTTONSIZE = {  
    small: 'min-h-6 h-6 py-1 px-2 text-xs',
    medium: 'min-h-8 h-8 py-2 px-2 text-sm',
    large: 'min-h-11 h-11 py-2 px-4 text-base'
  } as const
  
  
  const ACTIONTYPE = {
    ACTION: 'border-none text-white bg-primary hover:bg-primary-700 active:bg-primary-800',
    SAVE: 'border-none text-white border-terciary bg-terciary hover:bg-terciary-800 active:bg-terciary-900',
    CANCEL: 'text-cancel border-cancel bg-gray-200 hover:text-white hover:bg-cancel active:bg-cancel hover:shadow-md',
    SECONDARY: `text-secondary border border-secondary bg-white hover:text-white hover:bg-secondary`,
    DELETE: 'border-none text-white border-quaternary bg-quaternary hover:bg-quaternary-500 active:bg-quaternary-quaternary-700',
    CLOSE: 'border-none text-white border-secondary bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-950'
  } as const
  
  export function LinkAsButton ({ text, state, hoverTranslate, className, icon, url, actionType = 'ACTION', size = 'content', buttonSize }: Props) {
    return (
      <Link                        
        className={`flex justify-center items-center gap-2 ${BUTTONSIZE[buttonSize]} font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${hoverTranslate && 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'} ${className} ${ACTIONTYPE[actionType]} ${SIZE[size]}`}
        aria-label={`${text}`}
        title={`${text}`}
        state={{state}}
        to={url}
        replace
      >
        {icon}
        {text}
      </Link>
    )
  }