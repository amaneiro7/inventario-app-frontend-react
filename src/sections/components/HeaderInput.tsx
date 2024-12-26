type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export function HeaderInput({ children, ...props }: React.PropsWithChildren<Props>) {
  return (
    <section
      {...props}
      className={`relative h-10 min-h-min w-full grid grid-cols-[repeat(auto-fit,_150px)] gap-4 ${props.className}`}
    >
      {children}
    </section>
  )

}