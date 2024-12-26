import { memo } from "react"

export const Copyright = memo(({...props}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => {
  return (
    <p {...props} className='font-normal text-sm text-center text-black/60'>
      Copyright ©
      <strong> InventarioApp </strong>
      {`${new Date().getFullYear()}.`}      
    </p>
  )
})