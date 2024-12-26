export function RecordPerPage({
    limit,
    handleLimitChange
}: {
    limit: number
    handleLimitChange: (limit: number) => void
}) {
    const registerOptions = [
        { value: 10, label: '10 Registros' },
        { value: 25, label: '25 Registros' },
        { value: 50, label: '50 Registros' },
        { value: 100, label: '100 Registros' }
    ]
    
  return (
    <label htmlFor='records-per-page'>
      <select
        id='records-per-page'
        name='records-per-page' 
        value={limit}
        onChange={(event) => {
            handleLimitChange(Number(event.target.value))
        }}
        className='flex justify-center items-center gap-2 min-h-11 h-11 py-2 px-4 text-base text-secondary-900 border-secondary-900 bg-white hover:text-white hover:bg-secondary-900 disabled:bg-secondary-900 font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed appearance-none'
      >
        {registerOptions.map(option => (
          <option 
            key={option.value} 
            className='bg-white text-secondary-900' 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
