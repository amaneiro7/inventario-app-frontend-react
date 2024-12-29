import { lazy, memo, useMemo, useState } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type TypeOfSitePrimitives } from "../../../modules/location/typeofsites/domain/typeOfSite"
import { type TypeOfSiteId } from "../../../modules/location/typeofsites/domain/typeOfSiteId"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { useAppContext } from "@/sections/Context/AppProvider"

interface Props {
    onChange: OnHandleChange
    value: Primitives<TypeOfSiteId>
}

const TabsNav = lazy(async () => import('./TabsNav').then(m => ({ default: m.TabsNav })))
const TabNav = lazy(async () => import('./TabNav').then(m => ({ default: m.TabNav })))

export const TypeOfSiteTabNav = memo(function({ onChange, value }: Props) {
    const [inputValue, setInputValue] = useState(() => value ? value : '0')
    const { useTypeOfSite: { typeOfSite, loading } } = useAppContext()
    const typeOfSiteTab: TypeOfSitePrimitives[] = useMemo(() => {
        return [{ id: '0', name: 'Todos' }].concat(typeOfSite)
    }, [typeOfSite])
    
    return (      
      <TabsNav>          
        {!loading && typeOfSiteTab.map(type => (            
          <TabNav
            key={type.id}
            displayName={type.name}
            handleClick={() => {
                            if (type.id === inputValue) return
                            setInputValue(type.id)
                            onChange('typeOfSiteId', type.id === '0' ? '' : type.id, Operator.EQUAL)
                        }}
            value={inputValue}
            active={inputValue === type.id}
          />
        ))}
      </TabsNav>
    )
})