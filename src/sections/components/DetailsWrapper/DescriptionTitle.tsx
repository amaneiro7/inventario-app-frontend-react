interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    title: string
}
export function DesciptionTitle({ title, ...props}: Props) {
  return (
    <dt className='text-sm font-semibold leading-6 text-gray-900' {...props}>{title}:</dt>
  )
}
