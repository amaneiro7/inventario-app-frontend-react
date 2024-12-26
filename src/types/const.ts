export const SIZES = {
  extraSmall: 'w-4',
  small: 'w-6',
  medium: 'w-8',
  large: 'w-10',
  extralarge: 'w-12'
} as const

export type Size = typeof SIZES[keyof typeof SIZES]