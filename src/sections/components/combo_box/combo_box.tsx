import { lazy, memo, PropsWithChildren } from 'react'
import { createFilterOptions } from '@mui/material'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Autocomplete, AutocompleteProps } from '../../mui/Autocomplete'

// const Autocomplete = lazy(async () => await import("../../mui/Autocomplete").then(m => ({ default: m.Autocomplete })))
const TextField = lazy(async () => await import("../../mui/TextField").then(m => ({ default: m.TextField })))
const CircularProgress = lazy(async () => await import('../../mui/CircularProgress').then(m => ({ default: m.CircularProgress })))
const CloseIcon = lazy(async () => await import('../../mui/CloseIcon').then(m => ({ default: m.CloseIcon })))

interface Props<T, Multiple extends boolean, Disable extends boolean, FreeSolo extends boolean> extends Omit<AutocompleteProps<T, Multiple, Disable, FreeSolo>, 'renderInput'>  {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue?: any | null
  name: string  
  readonly?: boolean
  label: string
  loading?: boolean
  options: T[]
  isHidden?: boolean
  isDisabled?: boolean  
  isRequired?: boolean
  placeholder?: string
  isError?: boolean
  errorMessage?: string
  type?: 'form' | 'search'
}


const filter = createFilterOptions()
function ComboBox<T, Multiple extends boolean, Disable extends boolean, FreeSolo extends boolean>({
  id,
  name,
  initialValue = null,
  label,
  options,
  isDisabled = true,
  freeSolo,
  multiple,
  disableClearable,
  loading,
  onChange,
  isRequired = false,
  isError,
  errorMessage,
  children,
  type = 'search',
  readonly = false
}: PropsWithChildren<Props<T, Multiple, Disable, FreeSolo>>) {
  return (
    <>
      <Autocomplete
        id={`combo-box-${id}`}
        value={initialValue}
        freeSolo={freeSolo ?? false}
        multiple={multiple ?? false}
        disableClearable={disableClearable ?? false}
        onChange={(event, newValue, reason, details) => {
          onChange(event, newValue, reason, details)
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const { inputValue } = params
          const isExisting = options.some((option) => inputValue === option.name)
          if (inputValue !== '' && !isExisting && type !== 'search') {
            filtered.push({
              inputValue,
              name: `Añadir "${inputValue}"`,
            })
          }
          return filtered
        }}
        fullWidth
        disabled={isDisabled}
        size='small'
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        options={options}
        loading={loading}
        readOnly={readonly}
        clearText='Limpiar'
        loadingText='Cargando...'
        openText='Abrir'
        closeText='Cerrar'
        noOptionsText='No existe'
        selectOnFocus
        clearOnEscape
        clearOnBlur        
        handleHomeEndKeys        
        clearIcon={<CloseIcon fontSize='small' />}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}              
            required={isRequired}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color='inherit' size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            color={isError ? 'warning' : 'primary'}
            error={isError}
            helperText={errorMessage}
          />          
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue, { insideWords: true });
          const parts = parse(option.name, matches)
          return (
            <li key={props.id} {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
      />
      {children}
    </>
  )
}

export default memo(ComboBox) as typeof ComboBox