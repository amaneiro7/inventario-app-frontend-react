interface Props extends React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  position?: 'left' | 'center' | 'right'
}

const POSITION = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
}

export default function DetailsBoxWrapper({ position = 'left', children, ...props}: Props) {
  return (
    <div className={`w-full p-4 flex flex-col gap-3 bg-white shadow rounded-2xl ${POSITION[position]}`} {...props}>{children}</div>
  )
}
