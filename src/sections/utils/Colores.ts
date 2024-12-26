export const COLOR = {
    orange: 'border-primary',
    blue: 'border-secondary',
    green: 'border-terciary',
    red: 'border-quaternary',
} as const

export type ColorProps = keyof typeof COLOR