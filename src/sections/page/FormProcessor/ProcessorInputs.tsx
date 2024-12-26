import { lazy, Suspense } from "react"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { type DefaultProcessorProps, type FormProcessorDisabled, type FormProcessorErrors, type FormProcessorRequired } from "@/sections/Hooks/processor/DefaultInitialBrandState"

interface Props {
    disabled: FormProcessorDisabled
    error: FormProcessorErrors
    required: FormProcessorRequired
    formData: DefaultProcessorProps
    handleChange: (name: string, value: string) => void
}

const ProcessorCollectionComboBox = lazy(async () => import('@/sections/components/combo_box/ProductCollectionComboBox').then(m => ({ default: m.ProcessorCollectionComboBox })))
const ProcessorNumberModelInput = lazy(async () => import('@/sections/components/text-inputs/ProcessorNumberModelInput').then(m => ({ default: m.ProcessorNumberModelInput })))
const ProcessorCoresInput = lazy(async () => import('@/sections/components/number-inputs/ProcessorCoresInput').then(m => ({ default: m.ProcessorCoresInput })))
const ProcessorFrequencyInput = lazy(async () => import('@/sections/components/number-inputs/ProcessorFrequency').then(m => ({ default: m.ProcessorFrequencyInput })))
const ProcessorThreadsCheckbox = lazy(async () => import('@/sections/components/checkbox/ProcessorThreadsCheckbox').then(m => ({ default: m.ProcessorThreadsCheckbox })))

export function ProcessorInputs ({ required, disabled, error, formData, handleChange }: Props) {
    return (
      <>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ProcessorCollectionComboBox
            onChange={handleChange}
            value={formData.productCollection}
            isDisabled={disabled.productCollection}
            isRequired={required.productCollection}
            error={error.productCollection}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ProcessorNumberModelInput
            onChange={handleChange}
            value={formData.numberModel}
            isDisabled={disabled.numberModel}
            isRequired={required.numberModel}
            error={error.numberModel}
          />
        </Suspense>

        <div className='flex gap-4'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <ProcessorCoresInput
              onChange={handleChange}
              value={formData.cores}
              isDisabled={disabled.cores}
              isRequired={required.cores}
              error={error.cores}
            />
          </Suspense>


          <Suspense fallback={<InputSkeletonLoading />}>
            <ProcessorFrequencyInput
              onChange={handleChange}
              value={formData.frequency}              
              isDisabled={disabled.frequency}
              isRequired={required.frequency}
              error={error.frequency}
            />
          </Suspense>

          <Suspense>
            <ProcessorThreadsCheckbox
              onChange={handleChange}
              value={formData.threads}
              isDisabled={disabled.threads}
              isRequired={required.threads}
            />
          </Suspense>
        </div>
      </>
    )
}