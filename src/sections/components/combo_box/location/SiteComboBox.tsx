import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "../../../Context/AppProvider"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { initialSiteState } from "@/sections/Hooks/locations/site/useFormSite"
import { type OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type SiteId } from "../../../../modules/location/site/domain/SiteId"
import { type SitePrimitives } from "../../../../modules/location/site/domain/site"
import { type CityId } from "../../../../modules/location/city/domain/CityId"
import { type DefaultSiteProps } from "@/sections/Hooks/locations/site/DefaultSiteInitialState"


interface Props {
    value?: Primitives<SiteId>
    city?: Primitives<CityId>
    onChange?: OnHandleChange
    handleSite?: (value: string, siteName: string) => void
    isAddForm?: boolean
    type?: 'form' | 'search'
    error?: string
    disabled?: boolean
    required?: boolean
}

const ComboBox = lazy(async () => import("../combo_box"))
const DialogWrapper = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ReadOnlyInputBox = lazy(async () => import('@/sections/components/ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))
const SiteDialog = lazy(async () => import("@/sections/components/Dialog/SiteDialog").then(m => ({ default: m.SiteDialog })))

export function SiteComboBox({ value, city, onChange, handleSite, type = 'search', isAddForm = false, error, required, disabled = false }: Props) {
    const { useSite: { sites, loading }} = useAppContext()
    const [dialogValue, setDialogValue] = useState<DefaultSiteProps>(initialSiteState)
    const [open, setOpen] = useState(false)
    
    const filtered = useMemo(() => {
        if (!city) return sites
        return sites.filter(site => site.cityId === city)
    }, [sites, city])
    
    const initialValue = useMemo(() => {
        return filtered.find(site => site.id === value)
    }, [filtered, value])

    const handleClose = () => {
        setOpen(false)
      }
    
      const handleOpen = () => {
        setOpen(true)
      }

    return (
      <>
        <Suspense>
          {!isAddForm && type === 'form'
            ? <ReadOnlyInputBox label='Sitio' defaultValue={initialValue?.name} />
            : <ComboBox
                id='siteId'
                initialValue={initialValue}
                label='Sitio'
                name='siteId'
                type={type}
                onChange={(_, newValue: SitePrimitives & {
                    inputValue: string
                }) => {
                    if (typeof newValue === 'string') {
                        setTimeout(() => {
                            handleOpen()
                            setDialogValue(prev => ({ ...prev, name: newValue  }))
                        })
                    } else if (newValue && newValue.inputValue) {
                        handleOpen()
                        setDialogValue(prev => ({ ...prev, name: newValue.inputValue  }))                        
                    } else {
                        const value = newValue ? newValue.id : ''
                        if (onChange) {
                            onChange('siteId',value , Operator.EQUAL)
                        }
                        if (handleSite) {
                            const siteName = newValue ? newValue.name : ''
                            handleSite(value, siteName)
                        }
                    }
                }}
                options={filtered}
                isDisabled={disabled}
                isRequired={required}
                isError={!!error}
                errorMessage={error}
                loading={loading}
              />}
        </Suspense>
        {type === 'form' ?
          <Suspense>
            <DialogWrapper open={open} handleClose={handleClose}>
              <Suspense>
                <SiteDialog
                  initialDialogValue={dialogValue}
                  handleClose={handleClose}
                />
              </Suspense>
            </DialogWrapper>
          </Suspense>
            : null}
      </>
    )
}