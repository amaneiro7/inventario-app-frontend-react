import { memo } from "react"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  content?: keyof typeof HeightView
  overflow?: boolean
}

const HeightView = {
  max: 'h-max',
  full: 'h-full'
} as const

const Main = memo(({ children, content = "full", overflow = true, ...props }: React.PropsWithChildren<Props>) => {
  return (
    <main 
      className={`max-w-full ${HeightView[content]} max-h-min flex flex-col px-8 pt-4 pb-0 md:flex-1 ${overflow && 'md:overflow-hidden'} ${props.className}`} 
      {...props}
    >
      {children}
    </main>
  )
}

)

export default Main