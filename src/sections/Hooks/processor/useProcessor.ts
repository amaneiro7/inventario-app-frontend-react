import { useCallback, useEffect, useMemo, useState } from 'react'
import { AllProcessorGetter } from '../../../modules/devices/fetures/processor/application/AllProcessorGetter'
import { type ProcessorPrimitives } from '../../../modules/devices/fetures/processor/domain/Processor'
import { ProcessorCreator } from '../../../modules/devices/fetures/processor/application/ProcessorCreator'
import { ProcessorGetter } from '../../../modules/devices/fetures/processor/application/ProcessorGetter'
import { ApiProcessorRepository } from '../../../modules/devices/fetures/processor/infrastructure/ApiProcessorRepository'

export interface UseProcessor {
  processors: ProcessorPrimitives[]
  loading: boolean
  error: null | string
  getProcessor: ProcessorGetter
  createProcessor: (formData: ProcessorPrimitives) => Promise<void>
}
export const useProcessor = (): UseProcessor => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<ProcessorPrimitives[]>([])

  const repository = useMemo(() => { return new ApiProcessorRepository() }, [])
  const getProcessor = useMemo(() => { return new ProcessorGetter(repository) }, [repository])

  const getProcessors = useCallback(async () => {
    setLoading(true)
    new AllProcessorGetter(repository)
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [repository])

  const createProcessor = useCallback(async (payload: ProcessorPrimitives) => {
    const data = await new ProcessorCreator(repository).create(payload)
    await getProcessors()
    return data
  }, [getProcessors, repository])


  useEffect(() => {
    getProcessors()

    return () => {
      setData([])
    }
  }, [getProcessors])

  return {
    processors: data,
    loading,
    error,
    createProcessor,
    getProcessor
  }
}
