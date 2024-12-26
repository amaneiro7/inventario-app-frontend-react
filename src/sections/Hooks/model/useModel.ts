import { useCallback, useEffect, useMemo, useState } from 'react'
import { AllModelGetter } from '../../../modules/devices/model/model/application/AllModelGetter'
import { ModelCreator } from '../../../modules/devices/model/model/application/ModelCreator'
import { ModelGetter } from '../../../modules/devices/model/model/application/ModelGetter'
import { ApiModelRepository } from '../../../modules/devices/model/model/infraestructure/ApiModelRepository'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'

export interface UseModel {
  models: ModelPrimitives[]
  loading: boolean
  error: Error | null
  createModel: (formData: ModelPrimitives) => Promise<void>
  getModel: ModelGetter
}
export const useModel = (): UseModel => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [models, setModels] = useState<ModelPrimitives[]>([])

  const repository = useMemo(() => { return new ApiModelRepository() }, [])
  const getModel = useMemo(() => { return new ModelGetter(repository) }, [repository])

  const getModels = useCallback(() => {
    setLoading(true)
    new AllModelGetter(repository)
      .get()
      .then((model) => {
        setModels(model)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [repository])


  const createModel = useCallback(async (formData: ModelPrimitives) => {
    const data = await new ModelCreator(repository).create(formData)
    getModels()
    return data
  }, [getModels, repository])

  useEffect(() => {
    getModels()

    return () => {
      setModels([])
    }
  }, [getModels])

  return {
    models,
    loading,
    error,
    createModel,
    getModel
  }
}
