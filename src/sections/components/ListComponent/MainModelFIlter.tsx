import { lazy, Suspense } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

const CategoryComboBox = lazy(() => import('../combo_box/CategoryComboBox'))
const BrandComboBox = lazy(() => import('../combo_box/BrandComboBox'))
const ModelComboBox = lazy(() => import('../combo_box/ModelComboBox'))

export function MainModelFilter({
    handleChange,
    categoryId,
    brandId,
    id
}: {
    handleChange: OnHandleChange
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    id: Primitives<ModelId>
    
}) {
    return (
      <>
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategoryComboBox
            value={categoryId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={brandId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelComboBox
            name='id'
            value={id}
            brandId={brandId}
            categoryId={categoryId}
            onChange={handleChange}
          />
        </Suspense>
      </>
    )
}