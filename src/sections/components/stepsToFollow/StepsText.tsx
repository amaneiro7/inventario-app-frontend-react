import { CheckIcon } from "../icon/CheckIcon"
import { type BGCOLOR, Paragraph } from "../Typography/Paragraph"

interface Props {
    requisito: keyof typeof REQUISITO
    text: string
    icon?: JSX.Element
    iconText?: string
    backgroundColor?: keyof typeof BGCOLOR
}

const REQUISITO = {
  obligatorio: 'bg-primary-400',
  opcional: 'bg-cancel'
}

export function StepsText ({ requisito, text, iconText, icon, backgroundColor }: Props) {
    return (
      <div className='flex gap-1 items-center'>
        <CheckIcon width={24} className={`${REQUISITO[requisito]} aspect-square text-white rounded-full p-1`} />
        <p className='flex flex-row gap-1 items-center justify-center'>
          <Paragraph color='gray' variant='span' className='font-semibold capitalize' text={`${requisito}. `}  />
          <Paragraph color='gray' variant='span' text={text} />
          {icon !== undefined ? <Paragraph color='white' variant='span' text={iconText} backgroundColor={backgroundColor} icon={icon} /> : null}
        </p>
        
      </div>
    )
}