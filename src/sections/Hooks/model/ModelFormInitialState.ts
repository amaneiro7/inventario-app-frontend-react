import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModel } from './useModel'
import { type ModelPrimitives } from '@/modules/devices/model/model/domain/Model'
import { type ModelApiresponse } from '@/modules/shared/domain/types/responseTypes'
import { type DefaultModelProps } from './DefaultInitialModelState'

export const useModelInitialState = (defaultInitialModelState: DefaultModelProps) => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getModel } = useModel()
  const [preloadedModelState, setPreloadedModelState] = useState(defaultInitialModelState)

  const isAddForm = useMemo(() => {
    return !location.state
  }, [location.state])

  const processModelState = useCallback((model: ModelPrimitives): void => {
    const { brandId, categoryId, name, generic, updatedAt, modelComputer, modelLaptop, modelMonitor, modelPrinter } = model as ModelApiresponse
    setPreloadedModelState((prev) => ({ ...prev, id, brandId, categoryId, name, generic, updatedAt }))
    if (modelComputer !== null) {
      setPreloadedModelState((prev) => ({ ...prev, ...modelComputer }))
    }
    if (modelLaptop !== null) {
      setPreloadedModelState((prev) => ({ ...prev, ...modelLaptop }))
    }
    if (modelPrinter !== null) {
      setPreloadedModelState((prev) => ({ ...prev, ...modelPrinter }))
    }
    if (modelMonitor !== null) {
      setPreloadedModelState((prev) => ({ ...prev, ...modelMonitor }))
    }
  }, [id])

  const fetchModel = useCallback(() => {
    getModel.getById({ id })
      .then(model => {
        processModelState(model)
      })
      .catch(error => {
        console.error('useModelInitialState', error)
      })
  }, [getModel, id, processModelState])

  const setResetState = () => {
    if (!location.pathname.includes('model')) return
    if (isAddForm) {
      setPreloadedModelState({ id: undefined, ...defaultInitialModelState })
    } else {
      fetchModel()
    }
  }

  useEffect(() => {
    if (isAddForm || !location.pathname.includes('model')) {
      setPreloadedModelState(defaultInitialModelState)
      return
    }

    if (location.state?.state !== undefined) {
      const model = location.state?.state
      processModelState(model)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      fetchModel()

    }
  }, [defaultInitialModelState, fetchModel, id, isAddForm, location.state?.state, navigate, processModelState])

  return {
    preloadedModelState,
    setResetState,
    isAddForm
  }
}
