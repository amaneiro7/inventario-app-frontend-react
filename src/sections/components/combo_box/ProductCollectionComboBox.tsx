import { lazy, Suspense, useMemo } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { ProcessorProductCollection } from "@/modules/devices/fetures/processor/domain/ProcessorCollection"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type ProcessorPrimitives } from "@/modules/devices/fetures/processor/domain/Processor"


interface Props {
    value?: Primitives<ProcessorProductCollection>
    onChange: OnHandleChange
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))

export function ProcessorCollectionComboBox({ value, onChange, error, isRequired, isDisabled = false }: Props) {
    const { useProcessor: { processors, loading } } = useAppContext()

    const processorOptions: { id: string, name: string }[] = useMemo(() => {
        const productCollectionList: Set<string> = new Set()
        processors.forEach(processor => {
            productCollectionList.add(processor.productCollection)
        })
        return Array.from(productCollectionList).map(product => ({ id: product, name: product }))
    }, [processors])

    const initialValue = useMemo(() => {
        return processorOptions.find(category => category.name === value)
    }, [processorOptions, value])

    return (
      <Suspense>
        <ComboBox
          id='productCollection'
          initialValue={initialValue}
          label='Collección de Productos'
          name='productCollection'
          freeSolo
          type='search'
          onChange={(_, newValue: ProcessorPrimitives) => {
                    onChange('productCollection', newValue ? newValue.name : '')
                }}
          options={processorOptions}
          isRequired={isRequired}
          isDisabled={isDisabled}
          loading={loading}
          isError={!!error}
          errorMessage={error}
        />
      </Suspense>
    )
}