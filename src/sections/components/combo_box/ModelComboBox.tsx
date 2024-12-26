import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { initialModelState } from "@/sections/Hooks/model/useFormModel"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type BrandId } from "@/modules/devices/brand/domain/BrandId"
import { type CategoryId } from "@/modules/devices/category/domain/CategoryId"
import { type ModelApiresponse } from "@/modules/shared/domain/types/responseTypes"
import { type ModelId } from "@/modules/devices/model/model/domain/ModelId"
import { type DefaultModelProps } from "@/sections/Hooks/model/DefaultInitialModelState"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"

interface Props {
    value: Primitives<ModelId>
    name?: string
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    onChange?: OnHandleChange
    handleModel?: ({value, memoryRamSlotQuantity, memoryRamType, generic }: {value: string, memoryRamSlotQuantity?: number, memoryRamType?: string, generic?: boolean }) => void
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const DialogComponent = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ComboBox = lazy(async () => import("./combo_box"))
const ModelDialog = lazy(async () => import("../Dialog/ModelDialog"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function ModelComboBox({ value, error, isDisabled = false, isRequired, onChange, handleModel, categoryId, brandId, type = 'search', name = 'modelId', isAdd = false }: Props) {
    const { useModel: { models, loading } } = useAppContext()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<DefaultModelProps>(initialModelState)

    
    const filterdModel = useMemo(() => {
        return (models as unknown as ModelApiresponse[]).filter(model => {
            const category = model.categoryId === categoryId || !categoryId
            const brand = model.brandId === brandId || !brandId
            return category && brand
        })
    }, [models, categoryId, brandId])
    
    const initialValue = useMemo(() => {
        return filterdModel.find(model => model.id === value)
    }, [filterdModel, value])

    const handleClose = () => {
        toggleOpen(false)
      }
    
      const handleOpen = () => {
        toggleOpen(true)
      }

    return (
      <>
        {(!isAdd && type === 'form') ? 
          <Suspense><ReadOnlyInputBox label='Modelo' defaultValue={initialValue?.name} /></Suspense> : 
          <Suspense>
            <ComboBox
              id='modelId'
              initialValue={initialValue}
              label='Modelo'
              name={name}
              readOnly={!isAdd && type === 'form'}
              type={type}
              onChange={(_, newValue: ModelApiresponse & {
                inputValue: string
              }) => {
                  if (typeof newValue === 'string') {
                      // timeout to avoid instant validation of the dialog's form.
                      setTimeout(() => {
                          handleOpen()
                          setDialogValue(prev => ({ ...prev, value: newValue, categoryId, brandId }))
                      })
                  } else if (newValue && newValue.inputValue) {
                      handleOpen()
                      setDialogValue(prev => ({ ...prev, name: newValue.inputValue, categoryId, brandId }))
                  } else {
                      const value = newValue ? newValue.id : ''
                      const generic = newValue ? newValue.generic : undefined
                      if (type === 'form') {
                          let memoryRamSlotQuantity
                          let memoryRamType
                          if (newValue?.modelComputer !== null) {
                              memoryRamSlotQuantity = newValue ? newValue?.modelComputer.memoryRamSlotQuantity : undefined
                              memoryRamType = newValue ? newValue?.modelComputer.memoryRamType.name : ''
                              handleModel({ value, memoryRamSlotQuantity, memoryRamType })
                          }
                          if (newValue?.modelLaptop !== null) {
                              memoryRamSlotQuantity = newValue ? newValue?.modelLaptop.memoryRamSlotQuantity : undefined
                              memoryRamType = newValue ? newValue?.modelLaptop.memoryRamType.name : ''
                          }
                          handleModel({ value, memoryRamSlotQuantity, memoryRamType, generic })
                      }
                      else {
                          onChange(name, value, Operator.EQUAL)
                      }
                  }
              }}
              options={filterdModel}
              isDisabled={isDisabled}
              isRequired={isRequired}
              isError={!!error}
              errorMessage={error}
              loading={loading}
            />
          </Suspense>}
        {type === 'form' ?
          <Suspense>
            <DialogComponent open={open} handleClose={handleClose}>        
              <Suspense>
                <ModelDialog 
                  initialDialogValue={dialogValue} 
                  handleClose={handleClose}
                />
              </Suspense>
            </DialogComponent>
          </Suspense>
          : null}       
      </>
    )
}