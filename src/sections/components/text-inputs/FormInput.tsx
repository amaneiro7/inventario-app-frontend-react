import { TextField, TextFieldProps } from '../../mui/TextField'

interface Props extends Omit<TextFieldProps, 'variant'> {
  id?: string
  name: string
  type: React.HTMLInputTypeAttribute
  label: string
  placeholder: string
  handle: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value?: string | number
  defaultValue?: string
  isRequired?: boolean
  isDisabled?: boolean
  isError?: boolean
  errorMessage?: string
}
export function FormInput ({ id, name, value, type, placeholder, handle, defaultValue, label, isRequired = false, isDisabled = false, isError = false, errorMessage }: Props) {
  return (
    <TextField
      id={id}
      className='min-w-full min-h-10'
      required={isRequired}
      disabled={isDisabled}
      fullWidth                        
      size='small'
      name={name}
      value={value}
      label={label}
      type={type}
      onChange={handle}
      placeholder={placeholder}
      autoComplete={name}
      defaultValue={defaultValue}
      color={isError ? 'warning' : 'primary'}
      error={isError}
      helperText={errorMessage}
    />
  )
}
