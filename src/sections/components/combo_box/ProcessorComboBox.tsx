import { lazy, Suspense, useMemo, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { initialProcessorState } from "@/sections/Hooks/processor/useFormProcessor"
import { type ProcessorPrimitives } from "@/modules/devices/fetures/processor/domain/Processor"
import { type ProcessorId } from "@/modules/devices/fetures/processor/domain/ProcessorId"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"

interface Props {
    value?: Primitives<ProcessorId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const DialogComponent = lazy(async () => import("@/sections/components/Dialog/DialogComponent").then(m => ({ default: m.DialogWrapper })))
const ComboBox = lazy(async () => import("./combo_box"))
const ProcessorDialog = lazy(async () => import("../Dialog/ProcessorDialog"))

export default function ProcessorComboBox({ value, error, isDisabled, isRequired, onChange, type = 'search' }: Props) {
    const { useProcessor: { processors, loading } } = useAppContext()
    const [open, setOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<ProcessorPrimitives>(initialProcessorState)

    const initialValue = useMemo(() => {
        return processors.find(processor => processor.id === value)
    }, [processors, value])

    const processorOptions = useMemo(() => processors.map((processor) => ({
        id: processor.id,
        name: processor.name
    })), [processors])

    const handleClose = () => {
        setOpen(false)
      }
    
      const handleOpen = () => {
        setOpen(true)
      }

    return (
      <>
        <Suspense>
          <ComboBox
            id='processorId'
            initialValue={initialValue}
            label='Procesador'
            name='processorId'
            type={type}
            onChange={(_, newValue: ProcessorPrimitives & {
            inputValue: string
          }) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            setDialogValue(prev => ({
                                ...prev,
                                numberModel: newValue
                            }))
                            handleOpen()
                        })
                    } else if (newValue && newValue.inputValue) {
                        setDialogValue(prev => ({
                            ...prev,
                            numberModel: newValue.inputValue
                        }))
                        handleOpen()
                    } else {
                        onChange('processorId', newValue ? newValue.id : '', Operator.EQUAL)
                    }
                }}
            options={processorOptions}
            isDisabled={isDisabled}
            isRequired={isRequired}
            isError={!!error}
            errorMessage={error}
            loading={loading}
          />
        </Suspense>
        {type === 'form' ?
          <Suspense>
            <DialogComponent open={open} handleClose={handleClose}>
              <Suspense>
                <ProcessorDialog
                  initialDialogValue={dialogValue}
                  handleClose={handleClose}
                />
              </Suspense>        
            </DialogComponent>
          </Suspense>
        : null}
      </>
    )
}