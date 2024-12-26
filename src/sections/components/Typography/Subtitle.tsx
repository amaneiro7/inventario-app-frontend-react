interface Props {
  text: string
    variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    color?: keyof typeof COLOR
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
}

const COLOR = {
    orange: 'text-primary',
    blue: 'text-secondary',
    green: 'text-terciary',
    red: 'text-quaternary',
    black: 'text-black',
    white: 'text-white',
  } as const

export function Subtitle({ variant, color = 'black', text, textTransform = 'uppercase' }: Props) {
    const Tag = variant || 'h2'
    return (
      <Tag className={`text-sm md:text-base lg:text-lg font-semibold ${COLOR[color]} ${textTransform}`}>{text}</Tag>
    )
}