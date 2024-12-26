import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { initialBrandState } from "@/sections/Hooks/brand/useFormBrand"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type BrandId } from "@/modules/devices/brand/domain/BrandId"
import { type CategoryId } from "@/modules/devices/category/domain/CategoryId"
import { type BrandPrimitives } from "@/modules/devices/brand/domain/Brand"
import { type BrandApiResponse } from "@/modules/shared/domain/types/responseTypes"

interface Props {
    value?: Primitives<BrandId>
    categoryId?: Primitives<CategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}


const DialogComponent = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ComboBox = lazy(async () => import("./combo_box"))
const BrandDialog = lazy(async () => import("../Dialog/BrandDialog").then(m => ({ default: m.BrandDialog })))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function BrandComboBox({ value, onChange, error, isDisabled = false, isRequired, categoryId, type = 'search', isAdd = false }: Props) {
    const { useBrand: { brands, loading } } = useAppContext()
    const [open, setOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<BrandPrimitives>(initialBrandState)

    const filterdBrand = useMemo(() => {
        if (!categoryId) {
            return brands
        }

        return brands.filter(brand =>
            (brand as BrandApiResponse).model?.some(model =>
                model.categoryId === categoryId)
            )
        }, [brands, categoryId])
    
    const initialValue = useMemo(() => {
        return filterdBrand.find(brand => brand.id === value)
    }, [filterdBrand, value])

    const handleClose = () => {
        setOpen(false)
      }
    
      const handleOpen = () => {
        setOpen(true)
      }

    return (
      <>
        {(!isAdd && type === 'form') ? 
          <Suspense><ReadOnlyInputBox label='Marca' required defaultValue={initialValue?.name} /></Suspense> : 
          <Suspense>
            <ComboBox
              id='brandId'
              initialValue={initialValue}
              label='Marca'
              name='brandId'
              type={type}                                        
              onChange={(_, newValue: BrandPrimitives & {
                inputValue: string
              }) => {
                  if (typeof newValue === 'string') {
                      // timeout to avoid instant validation of the dialog's form.
                      setTimeout(() => {
                          setDialogValue({
                              name: newValue
                          })
                          handleOpen()
                      })
                  } else if (newValue && newValue.inputValue) {
                      setDialogValue({
                          name: newValue.inputValue
                      })
                      handleOpen()
                  } else {
                      onChange('brandId', newValue ? newValue.id : '', Operator.EQUAL)
                  }
              }}
              options={filterdBrand as BrandApiResponse[]}
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
                <BrandDialog
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