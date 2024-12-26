import { useCallback } from 'react'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { ModelCreator } from '../../../modules/devices/model/model/application/ModelCreator'
import { ApiModelRepository } from '../../../modules/devices/model/model/infraestructure/ApiModelRepository'

export const useCreateModel = (): {
    createModel: (formData: ModelPrimitives) => Promise<void>
} => {
    return {
        createModel: useCallback(async (formData: ModelPrimitives) => {
            return await new ModelCreator(new ApiModelRepository()).create(formData)
        }, [])
    }
}
