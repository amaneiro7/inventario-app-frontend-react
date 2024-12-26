
import { useSearchParams } from 'react-router-dom'
interface inputDataType {
  name: string
  value: string
}
const [_, setSearchParams] = useSearchParams()
export const updateSearchParams = ({ name, value }: inputDataType) => {
  if (value === '') {
    setSearchParams(prev => {
      prev.delete(name)
      return prev
    })
  } else {
    setSearchParams(prev => {
      prev.set(name, value)
      return prev
    }, { replace: true })
  }
}

export const cleanSearchParams = () => {
  setSearchParams('')
}
