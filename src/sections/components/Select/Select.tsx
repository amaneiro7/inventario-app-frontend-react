import { type SelectChangeEvent, Select as SelectMui } from '../../mui/Select'
import { InputLabel as InputLabelMui } from '../../mui/InputLabel'
import { MenuItem as MenuItemMui } from '../../mui/MenuItem'
import { FormHelperText } from '../../mui/FormHelperText'
import { FormControl } from '../../mui/FormControl'

interface Props {
  name: string
  value?: string | number
  defaultValue?: string | number
  label: string
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void
  placeholder?: string
  isRequired?: boolean
  isError?: boolean
  errorMessage?: string
}

interface Options {
  id: string | number
  name: string | number
}

export default function Select({
  name,
  value,
  defaultValue,
  label,
  options,
  isHidden = true,
  isDisabled = true,
  onChange,
  placeholder,
  isRequired = false,
  isError,
  errorMessage
}: Props) {
  return (
    <FormControl size='small' className='w-full'>
      <InputLabelMui className='p-0' id='simple-select-label'>{label}</InputLabelMui>
      <SelectMui
        labelId='simple-select-label'
        id='simple-select'
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        required={isRequired}
        disabled={isDisabled}
        error={isError}

      >
        <MenuItemMui value='' hidden={isHidden} disabled={isDisabled}><em>{placeholder}</em></MenuItemMui>
        {options?.map(elem =>
          <MenuItemMui
            key={elem.id}
            value={elem?.id}
          >
            {elem?.name}
          </MenuItemMui>
        )}
      </SelectMui>
      <FormHelperText error={isError}>{errorMessage}</FormHelperText>
    </FormControl>
  )
}
