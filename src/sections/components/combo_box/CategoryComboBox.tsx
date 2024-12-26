import { lazy, useMemo } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type CategoryPrimitives } from "../../../modules/devices/category/domain/Category"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { type MainCategoryId } from "@/modules/devices/mainCategory/domain/MainCategoryId"

interface Props {
    value: Primitives<CategoryId>
    mainCategory?: Primitives<MainCategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function CategoryComboBox({ value, mainCategory, error, isDisabled = false, isRequired, onChange, type = 'search', isAdd = false }: Props) {
    const { useCategory: { categories, loading } } = useAppContext()

    const filterCategory = useMemo(() => {
      if (!mainCategory) return categories
      
      return categories.filter(cat =>  
      (cat.mainCategoryId === mainCategory)
      )
      
    },[categories, mainCategory])

    const initialValue = useMemo(() => {
        return categories.find(category => category.id === value)
    }, [categories, value])


    if (!isAdd && type === 'form') {
      return (
        <ReadOnlyInputBox label='SubCategoria' required={isRequired} defaultValue={initialValue?.name} />
      )
    } else {
      return (
        <ComboBox
          id='categoryId'
          initialValue={initialValue}
          label='SubCategoria'
          name='categoryId'
          type={type}
          onChange={(_, newValue: CategoryPrimitives) => {
                        onChange('categoryId', newValue ? newValue.id : '', Operator.EQUAL)
                    }}
          options={filterCategory}
          isRequired={isRequired}
          isDisabled={isDisabled}
          loading={loading}
          isError={!!error}
          errorMessage={error}
        />
      )
    }    
}