import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ModelName } from '../../../modules/devices/model/model/domain/ModelName'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<ModelName>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export default function ModelNameInput ({ value, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current || value === '') {
      isFirstInput.current = value?.length <= ModelName.NAME_MIN_LENGTH
      return
    }

    const isValid = ModelName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ModelName.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
          id='name'
          name="name"
          type="text"
          label='Name'
          isRequired={type === 'form'}
          placeholder='-- Ingrese el Nombre del Modelo'
          handle={(event) => {
            const { name, value } = event.target
            onChange(name, value)
          }}
          value={value}
          isError={isError}
          errorMessage={errorMessage}
      />
    </Suspense>
  )
}

