import { useCallback, useEffect, useState } from 'react'
import { AllMainCategoryGetter } from '@/modules/devices/mainCategory/application/AllMainCategoryGetter'
import { ApiMainCategoryRepository } from '@/modules/devices/mainCategory/infraestructure/ApiMainCategoryRepository'
import { type MainCategoryPrimitives } from '@/modules/devices/mainCategory/domain/MainCategory'


export interface UseMainCategory {
  mainCategories: MainCategoryPrimitives[]
  loading: boolean
  error: string | null
}

export const useMainCategory = (): UseMainCategory => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mainCategories, setMainCategory] = useState<MainCategoryPrimitives[]>([])
  
  const getMainCategory = useCallback(() => {
    setLoading(true)    
    new AllMainCategoryGetter(new ApiMainCategoryRepository())
      .get()
      .then((res) => {
        setMainCategory(res)
      })
      .catch((error) => {
        setError(error)
      }).finally(() => {
        setLoading(false)
      })
  }, [])
  
  useEffect(() => {
    getMainCategory()

    return () => {
      setMainCategory([])
    }
  }, [getMainCategory])

  return {
    mainCategories,
    loading,
    error
  }
}
