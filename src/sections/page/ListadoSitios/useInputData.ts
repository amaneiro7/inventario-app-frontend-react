import { useSearchParams } from 'react-router-dom'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'

export interface InputData {
  name: string
  stateId: string
  cityId: string
  typeOfSiteId: Primitives<TypeOfSiteId>
}

type UpdateInputData = ({ name, value }: inputDataType) => void
interface inputDataType {
  name: string
  value: string
}

export const useInputsData = (): {
  inputData: InputData
  updateInputData: UpdateInputData
  clearInputs: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateInputData = ({ name, value }: inputDataType) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(name)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.set(name, value)
        return prev
      })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const inputData = {
    name: searchParams.get('name') ?? '',
    stateId: searchParams.get('stateId') ?? '',
    cityId: searchParams.get('cityId') ?? '',
    typeOfSiteId: searchParams.get('typeOfSiteId') ?? '',
  }

  return {
    inputData,
    updateInputData,
    clearInputs
  }
}
