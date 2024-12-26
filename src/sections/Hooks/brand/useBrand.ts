import { useCallback, useEffect, useMemo, useState } from 'react'
import { AllBrandGetter } from '../../../modules/devices/brand/application/AllBrandGetter'
import { BrandCreator } from '../../../modules/devices/brand/application/BrandCreator'
import { type BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'
import { BrandGetter } from '../../../modules/devices/brand/application/BrandGetter'
import { ApiBrandRepository } from '../../../modules/devices/brand/infraestructure/ApiBrandRepository'

export interface UseBrand {
  brands: BrandPrimitives[]
  loading: boolean
  error: null | string
  getBrand: BrandGetter
  createBrand: (formData: BrandPrimitives) => Promise<void>
}
export const useBrand = (): UseBrand => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brands, setBrands] = useState<BrandPrimitives[]>([])

  const repository = useMemo(() => { return new ApiBrandRepository() }, [])
  const getBrand = useMemo(() => { return new BrandGetter(repository) }, [repository])

  const getBrands = useCallback(() => {
    setLoading(true)
    new AllBrandGetter(repository)
      .get()
      .then((brand) => {
        setBrands(brand)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [repository])

  const createBrand = useCallback(async (formData: BrandPrimitives) => {
    const data = await new BrandCreator(repository).create(formData)
    getBrands()
    return data
  }, [repository, getBrands])

  useEffect(() => {
    getBrands()

    return () => {
      setBrands([])
    }
  }, [getBrands])

  return {
    brands,
    loading,
    error,
    createBrand,
    getBrand
  }
}
