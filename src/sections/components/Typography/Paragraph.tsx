interface Props {
    variant?: 'p' | 'span'
    color?: keyof typeof COLOR
    backgroundColor?: keyof typeof BGCOLOR
    className?: string
    text: string
    icon?: JSX.Element
}

const COLOR = {
    orange: 'text-primary-400',
    blue: 'text-secondary',
    green: 'text-terciary',
    red: 'text-error',
    black: 'text-black',
    gray: 'text-cancel',
    white: 'text-white',
  } as const

  // eslint-disable-next-line react-refresh/only-export-components
  export const BGCOLOR = {
    orange: 'bg-primary-600',
    blue: 'bg-secondary-800',
    green: 'bg-terciary',
    red: 'bg-error',
    black: 'bg-black',
    gray: 'bg-cancel',
    white: 'bg-white',
    none: 'bg-transparent'
  } as const

export function Paragraph({ variant, icon, color = 'black', backgroundColor = 'none', text, className }: Props) {
    const Tag = variant || 'p'
    return (
      <Tag className={`${icon === undefined ? 'text-xs md:text-sm lg:text-base' : `w-fit text-xs md:text-xs lg:text-xs inline-flex items-center gap-1 rounded-2xl px-2 ${BGCOLOR[backgroundColor]}`} ${COLOR[color]} ${className}`}>{icon}{text}</Tag>
    )
}