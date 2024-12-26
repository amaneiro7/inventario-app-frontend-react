import { useMemo } from 'react'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { getValueFromQueryParams } from '../../utils/getValueFromQueryParams'


export interface InputData {
    id: Primitives<ModelId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
}

export function useDefaultInitialInputValue(): {
    inputData: InputData,
    defaultInputData: InputData
} {

    const defaultInputData = useMemo(() => {
        return {
            id: '',
            categoryId: '',
            brandId: '',
        }
    }, [])

    const getValuesFromQueryParams = useMemo(() => {
        return getValueFromQueryParams(defaultInputData)
    }, [defaultInputData])

    return {
        defaultInputData,
        inputData: { ...defaultInputData, ...getValuesFromQueryParams }
    }
}