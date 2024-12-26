import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { StatusId } from "@/modules/devices/devices/status/domain/StatusId"
import { TypeOfSiteId } from "@/modules/location/typeofsites/domain/typeOfSiteId"
import { initialLocationState } from "@/sections/Hooks/locations/useFormLocation"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type LocationId } from "@/modules/location/locations/domain/locationId"
import { type LocationApiResponse } from "@/modules/shared/domain/types/responseTypes"
import { type LocationPrimitives } from "@/modules/location/locations/domain/location"
import { type DefaultLocationProps } from "@/sections/Hooks/locations/DefaulLocationtInitialState"

interface Props {
  value?: Primitives<LocationId>
  typeOfSiteId?: Primitives<LocationId>
  statusId?: Primitives<StatusId>
  onChange?: OnHandleChange
  handleLocation?: ({ value, typeOfSiteId, ipAddress }: { value: string; typeOfSiteId?: string, ipAddress?: string }) => void
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}


const DialogComponent = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ComboBox = lazy(async () => import("./combo_box"))
const LocationDialog = lazy(async () => import("../Dialog/LocationDialog").then(m => ({ default: m.LocationDialog })))

export default function LocationComboBox({ value, error, isDisabled = false, isRequired, statusId, typeOfSiteId, onChange, handleLocation, type = 'search' }: Props) {
  const { useSiteLocation: { locations, loading } } = useAppContext()
  const [dialogValue, setDialogValue] = useState<DefaultLocationProps>(initialLocationState)
  const [open, setOpen] = useState(false)
  
  const filterLocation = useMemo(() => {
    return locations.filter(location => {
      const typeOfSite = location.typeOfSiteId === typeOfSiteId || !typeOfSiteId
      const status = !statusId ? true : [
        StatusId.StatusOptions.INUSE,
        StatusId.StatusOptions.PRESTAMO,
        StatusId.StatusOptions.CONTINGENCIA,
        StatusId.StatusOptions.GUARDIA,
        StatusId.StatusOptions.DISPONIBLE,
      ].includes(statusId) ? ([TypeOfSiteId.SitesOptions.ADMINISTRATIVE, TypeOfSiteId.SitesOptions.AGENCY].includes(location.typeOfSiteId)) : [TypeOfSiteId.SitesOptions.ALMACEN].includes(location.typeOfSiteId)
      return typeOfSite && status
    })
  }, [locations, typeOfSiteId, statusId])
  
  const initialValue = useMemo(() => {
    return filterLocation.find(location => location.id === value)
  }, [filterLocation, value])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <ComboBox
        id='locationId'
        initialValue={initialValue}
        label='Ubicación'
        name='locationId'
        type={type}
        onChange={(_, newValue: LocationPrimitives & {
            inputValue: string
          }) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setDialogValue(prev => ({ ...prev, name: newValue }))
              handleOpen()
            })
          } else if (newValue && newValue.inputValue) {
            setDialogValue(prev => ({ ...prev, name: newValue.inputValue }))
            handleOpen()
          } else {
            if (type === 'form') {
              const value = newValue ? newValue.id : ''
              const typeOfSiteId = newValue ? newValue.typeOfSiteId : ''
              const ipAddress = newValue ? newValue.subnet : ''
              handleLocation({ value, typeOfSiteId, ipAddress })
            }
            else {
              onChange('locationId', newValue ? newValue.id : '', Operator.EQUAL)
            }
          }
        }}
        options={filterLocation as LocationApiResponse[]}
        isDisabled={isDisabled}
        isRequired={isRequired}
        loading={loading}
        isError={!!error}
        errorMessage={error}
      />
      
      {type === 'form' ?
        <Suspense>
          <DialogComponent open={open} handleClose={handleClose}>            
            <LocationDialog
              initialDialogValue={dialogValue}
              handleClose={handleClose}
            />   
          </DialogComponent>
        </Suspense>
        : null}
    </>
  )
}