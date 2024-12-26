import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useProcessor } from './useProcessor'
import { type DefaultProcessorProps } from './DefaultInitialBrandState'

export const useProcessorInitialState = (defaultInitialProcessorState: DefaultProcessorProps) => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { getProcessor } = useProcessor()
  const [preloadedProcessorState, setPreloadedProcessorState] = useState(defaultInitialProcessorState)

  const isAddForm = useMemo(() => {
    return !location.pathname.includes('edit')
  }, [location.pathname])

  const fetchProcessor = useCallback(() => {
    getProcessor.getById({ id })
      .then(processor => {
        setPreloadedProcessorState(processor)
      })
      .catch(error => {
        console.error(error)
      })
  }, [getProcessor, id])

  const setResetState = () => {
    if (location.pathname.includes('processor')) return
    if (isAddForm) {
      setPreloadedProcessorState({ id: undefined, ...defaultInitialProcessorState })
    } else {
      fetchProcessor()
    }
  }

  useEffect(() => {
    if (isAddForm || !location.pathname.includes('processor')) {
      setPreloadedProcessorState(defaultInitialProcessorState)
      return
    }

    if (location.state?.state !== undefined) {
      const processor = location.state?.state

      setPreloadedProcessorState(processor)
    } else {
      if (id === undefined) {
        navigate('/error')
        return
      }
      fetchProcessor()
    }
  }, [defaultInitialProcessorState, fetchProcessor, id, isAddForm, location.state?.state, navigate])

  return {
    preloadedProcessorState,
    isAddForm,
    setResetState
  }
}
