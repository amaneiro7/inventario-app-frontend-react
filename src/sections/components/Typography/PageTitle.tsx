import { memo } from "react"

function PageTitle ({ title, optionalText }: { title: string, optionalText?: string }) {
  return (
    <h1 className='min-h-fit mb-5 text-xl font-bold leading-tight tracking-tight text-secondary-950 md:text-2xl dark:text-white'>
      {title}
      <span className='ml-4 text-secondary-900 text-base font-normal'>{optionalText}</span>
    </h1>
  )
}

export default memo(PageTitle)