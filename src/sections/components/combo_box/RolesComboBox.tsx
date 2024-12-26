import { lazy, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { useRole } from "../../Hooks/role/useRole"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type RolePrimitives } from "../../../modules/user/role/domain/Role"
import { type RoleId } from "../../../modules/user/role/domain/RoleId"

interface Props {
    value: Primitives<RoleId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export default function RolesComboBox({ value, onChange, type = 'search' }: Props) {
    const { roles, loading } = useRole()    

    const initialValue = useMemo(() => {
        return roles.find(role => role.id === value)
    }, [roles, value])

    return (      
      <ComboBox
        id='roleId'
        initialValue={initialValue}
        label='Cargo'
        name='roleId'
        type={type}
        onChange={(_, newValue: RolePrimitives) => {
            onChange('roleId', newValue ? newValue.id : '', Operator.EQUAL)                    
          }}
        options={roles}
        isRequired={type === 'form'}
        isDisabled={false}
        loading={loading}
      />
    )
}