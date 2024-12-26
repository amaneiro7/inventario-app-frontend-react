import { MenuItem, Select, type SelectChangeEvent } from "@mui/material"

interface Props {
  value: string
  onChange: (e: SelectChangeEvent) => void
}

export function UserManagementAction({ value, onChange }: Props) {
  const actions = [
    { id: 'editar', name: 'Editar'},
    { id: 'reset', name: 'Restablecer contraseña'},
    { id: 'delete', name: 'Eliminar Cuenta'}
]

  return (    
    <div className='h-max items-center overflow-hidden px-4 py-2 grid grid-cols-3 gap-4'>
      <label id='action-label-select' className='text-sm font-semibold' htmlFor='selectAction'>Acciones</label>
      <Select
        labelId='action-label-select'        
        onChange={onChange}
        value={value}        
        name='action'
        autoWidth        
        size='small'
        aria-label='Selecciona una acción a realizar para gestionar el usuario'
        title='Selecciona una accion a realizar para gestionar un usuario'        
      >        
        {actions.map(action => (
          <MenuItem key={action.id} value={action.id}>
            {action.name}
          </MenuItem>
      ))}
      </Select>    
    </div>
  )
}
