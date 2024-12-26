import { useRef, useState } from 'react'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
interface NumberInputProps extends InputProps {
  label: string
  isRequired?: boolean
  error?: boolean
  errorMessage?: string
}

export function NumberInput({ error, errorMessage, label, isRequired = false, ...inputProps }: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  return (
    <div className='relative inline-flex flex-col align-top w-full select-all'>
      <label
        style={{
          transformOrigin: 'top left',
          transform: 'translate(14px, -9px) scale(0.75)',
          transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
        }}
        className={`absolute bg-white px-1 font-body font-normal text-base tracking-tighter p-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(133%-32px)] top-0 left-0 select-none pointer-events-auto ${error ? 'text-red-600' : isFocused ? 'text-focus' : 'text-black/60'}`}
      >
        {`${label} ${isRequired ? '*' : ''}`}
      </label>
      <div className={`w-full p-1 pr-2 border rounded-md outline-none select-all ${isFocused && 'ring-1'} ${error ? `border-error hover:border-error ${isFocused && 'ring-error'} ` : `${isFocused ? 'ring-focus border-focus' : 'border-black/25 hover:border-black read-only:hover:border-black/25'}`}`}>
        <input
          {...inputProps}
          className='py-1 pr-1 pl-2 w-0 min-w-full flex-1 text-ellipsis focus-visible:outline-none select-all'
          type='number'
          ref={inputRef}
          required={isRequired}
          onFocus={() => {
            setIsFocused(true)
            inputRef.current.select()
          }}
          onBlur={() => { setIsFocused(false) }}
        />
        <fieldset
          aria-hidden className={`text-left absolute inset-0 -top-1 m-0 p-0 pointer-events-none overflow-hidden min-w-0
         `}
        >
          <legend
            style={{
              transition: 'max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms'
            }}
            className='w-auto overflow-hidden p-0 h-3 text-xs invisible max-w-full whitespace-nowrap float-[unset]'
          >
            <span
              className='visible px-1 inline-block opacity-0'
            >
              {`${label} ${isRequired ? '*' : ''}`}
            </span>
          </legend>
        </fieldset>

      </div>
      {error && <p className='text-xs m-1 mx-4 font-normal font-sans text-left tracking-[0.033rem] text-error'>{errorMessage}</p>}
    </div>
  )
}
