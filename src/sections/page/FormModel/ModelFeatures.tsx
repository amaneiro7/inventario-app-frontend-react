import { lazy, Suspense, useMemo } from 'react'
import { ModelComputer } from '@/modules/devices/model/ModelCharacteristics/modelComputer/ModelComputer'
import { ModelLaptop } from '@/modules/devices/model/ModelCharacteristics/modelLaptop/ModelLaptop'
import { ModelMonitor } from '@/modules/devices/model/ModelCharacteristics/modelMonitor/ModelMonitor'
import { ModelKeyboard } from '@/modules/devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard'
import { ModelPrinter } from '@/modules/devices/model/ModelCharacteristics/modelPrinter/ModelPrinter'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from '@/sections/Hooks/model/DefaultInitialModelState'

interface Props {
  formData: DefaultModelProps
  onChange: OnHandleChange
  isAddForm?: boolean
  disabled: FormModelDisabled
  error: FormModelErrors
  required: FormModelRequired
}

const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const CategoryComboBox = lazy(async () => import('@/sections/components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => import('@/sections/components/combo_box/BrandComboBox'))
const AddModelComputer = lazy(async () => import('./AddModelComputer').then(m => ({ default: m.AddModelComputer })))
const AddModelMonitor = lazy(async () => import('./AddModelMonitor').then(m => ({ default: m.AddModelMonitor })))
const AddModelPrinter = lazy(async () => import('./AddModelPrinter').then(m => ({ default: m.AddModelPrinter })))
const AddModelKeyboard = lazy(async () => import('./AddModelKeyboard').then(m => ({ default: m.AddModelKeyboard })))
const Checkbox = lazy(async () => import('@/sections/components/checkbox/Checbox').then(m => ({ default: m.Checkbox })))

export function ModelInputs({ onChange, formData, isAddForm, disabled, error, required }: Props) {
  const categoryType = useMemo(() => {
    return (
      ModelComputer.isComputerCategory({ categoryId: formData.categoryId }) ? 'computer' :
        ModelLaptop.isLaptopCategory({ categoryId: formData.categoryId }) ? 'laptop' :
          ModelMonitor.isMonitorCategory({ categoryId: formData.categoryId }) ? 'monitor' :
            ModelPrinter.isPrinterCategory({ categoryId: formData.categoryId }) ? 'printer' :
              ModelKeyboard.isKeyboardCategory({ categoryId: formData.categoryId }) ? 'keyboard' : null
    )
  }, [formData.categoryId])
  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <CategoryComboBox
          value={formData.categoryId}
          onChange={onChange}
          type='form'
          isAdd={isAddForm}
          error={error.categoryId}
          isDisabled={disabled.categoryId}
          isRequired={required.categoryId}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <BrandComboBox
          value={formData.brandId}
          onChange={onChange}
          type='form'
          isAdd={isAddForm}
          error={error.brandId}
          isDisabled={disabled.brandId}
          isRequired={required.brandId}
        />

      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Input
          id='name'
          name='name'
          type='text'
          label='Name'
          onChange={(event) => {
            const { name, value } = event.target
            onChange(name, value)
          }}
          value={formData.name}
          error={!!error.name}
          errorMessage={error.name}
          disabled={disabled.name}
          required={required.name}
        />
      </Suspense>
      <Checkbox
        label='modelo genéirco'
        text='¿Es un modelo genérico?'
        name='generic'
        value={formData.generic ?? false}
        handle={(event) => {
          const { name, checked } = event.target
          onChange(name, checked);
        }}
      />
      {categoryType === 'computer' || categoryType === 'laptop' ?
        <Suspense>
          <AddModelComputer
            formData={formData}
            onChange={onChange}
            error={error}
            disabled={disabled}
            required={required}
            categoryType={categoryType}
          />
        </Suspense>
        : null}
      {categoryType === 'monitor' ?
        <Suspense>
          <AddModelMonitor
            formData={formData}
            onChange={onChange}
            error={error}
            disabled={disabled}
            required={required}
          />
        </Suspense>
        : null}
      {categoryType === 'printer' ?
        <Suspense>
          <AddModelPrinter
            formData={formData}
            onChange={onChange}
            error={error}
            disabled={disabled}
            required={required}
          />
        </Suspense>
        : null}
      {categoryType === 'keyboard' ?
        <Suspense>
          <AddModelKeyboard
            formData={formData}
            onChange={onChange}
            error={error}
            disabled={disabled}
            required={required}
          />
        </Suspense>
        : null}
    </>
  )
}