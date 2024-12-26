import { useCallback, useState } from 'react'
import { ModelGetterByCriteria } from '@/modules/devices/model/model/application/ModelGetterByCriteria'
import { ApiModelRepository } from '@/modules/devices/model/model/infraestructure/ApiModelRepository'
import { type SearchByCriteriaQuery } from '@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type ModelApiresponse } from '@/modules/shared/domain/types/responseTypes'

export interface UseModelByCriteria {
  models: ModelApiresponse[]
  total: number
  loading: boolean
  error: string | null
  searchModelsByCriteria: (filter: SearchByCriteriaQuery) => void
  reset: () => void
}

const initialState: {
  models: ModelApiresponse[]
  total: number
  loading: boolean
  error: string | null
} = {
  models: [],
  total: 0,
  loading: false,
  error: null
}

export const useModelByCriteria = (): UseModelByCriteria => {
  const [state, setState] = useState(initialState)

  const searchModelsByCriteria = useCallback((filter: SearchByCriteriaQuery) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }))

    new ModelGetterByCriteria(new ApiModelRepository())
      .get(filter)
      .then((model) => {
        setState({
          models: model.data as ModelApiresponse[],
          total: model.total,
          loading: false,
          error: null
        })
      })
      .catch((error: Error) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          // error: 'An unexpected error occurred while trying to search models' 
          error: error.message
        }))
      })
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    models: state.models,
    total: state.total,
    loading: state.loading,
    error: state.error,
    searchModelsByCriteria,
    reset
  }
}
