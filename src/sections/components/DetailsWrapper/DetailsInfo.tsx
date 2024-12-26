import { type DescriptionListElement } from "./DescriptionListElement"

interface Props {
  title: string
  children: React.ReactElement<typeof DescriptionListElement>[]
}

export function DetailsInfo({ title, children }: Props) {
  return (
    <div className='fit w-full p-4 flex justify-center bg-white rounded-2xl shadow'>
      <div className='w-1/2 h-full rounded shadow-lg shadow-slate-400'>
        <p className='w-full rounded-t px-4 py-2 bg-secondary text-white'>{title}</p>
        <dl className='divide-y divide-gray-300'>
          {children}
        </dl>
      </div>
    </div>

  )
}