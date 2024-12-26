import { useCallback, useEffect, useState } from 'react'
import { AllCategoryGetter } from '../../../modules/devices/category/application/AllCategoryGetter'
import { type CategoryPrimitives } from '../../../modules/devices/category/domain/Category'
import { ApiCategoryRepository } from '../../../modules/devices/category/infraestructure/ApiCategoryRepository'

export interface UseCategory {
  categories: CategoryPrimitives[]
  loading: boolean
  error: string | null
}

export const useCategory = (): UseCategory => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategory] = useState<CategoryPrimitives[]>([])
  
  const getCategory = useCallback(() => {
    setLoading(true)    
    new AllCategoryGetter(new ApiCategoryRepository())
      .get()
      .then((res) => {
        setCategory(res)
      })
      .catch((error) => {
        setError(error)
      }).finally(() => {
        setLoading(false)
      })
  }, [])
  
  useEffect(() => {
    getCategory()

    return () => {
      setCategory([])
    }
  }, [getCategory])

  return {
    categories,
    loading,
    error
  }
}
