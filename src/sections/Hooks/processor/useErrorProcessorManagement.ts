import { useEffect, useRef, useState } from "react"
import { ProcessorName } from "@/modules/devices/fetures/processor/domain/ProcessorName"
import { ProcessorProductCollection } from "@/modules/devices/fetures/processor/domain/ProcessorCollection"
import { ProcessorNumberModel } from "@/modules/devices/fetures/processor/domain/ProcessorNumberModel"
import { ProcessorCores } from "@/modules/devices/fetures/processor/domain/ProcessorCores"
import { ProcessorFrequency } from "@/modules/devices/fetures/processor/domain/ProcessorFrequency"
import { ProcessorHasThreads } from "@/modules/devices/fetures/processor/domain/ProcessorHasThreads"
import { type DefaultProcessorProps, type FormProcessorDisabled, type FormProcessorErrors, type FormProcessorRequired } from "./DefaultInitialBrandState"


export function useErrorProcessorManagement({
    name,
    cores,
    frequency,
    numberModel,
    productCollection,
    threads
}: DefaultProcessorProps) {
    const isFirstProcessorNameInput = useRef(true)
    const isFirstProductCollectionInput = useRef(true)
    const isFirstNumberModelInput = useRef(true)
    const [error, setError] = useState<FormProcessorErrors>({
        name: '',
        cores: '',
        frequency: '',
        threads: '',
        numberModel: "",
        productCollection: "",

    })
    const [disabled, setDisabled] = useState<FormProcessorDisabled>({
        name: false,
        cores: false,
        frequency: false,
        threads: false,
        numberModel: false,
        productCollection: false,
    })

    const [required, setRequired] = useState<FormProcessorRequired>({
        name: true,
        cores: true,
        frequency: true,
        threads: true,
        numberModel: true,
        productCollection: true,
    })

    useEffect(() => {
        if (isFirstProcessorNameInput.current || name === '') {
            isFirstProcessorNameInput.current = name.length < ProcessorName.NAME_MIN_LENGTH
        }
        if (isFirstProductCollectionInput.current) {
            isFirstProductCollectionInput.current = productCollection === ''
        }
        if (isFirstNumberModelInput.current) {
            isFirstNumberModelInput.current = numberModel === ''
        }
        setError(prev => ({
            ...prev,
            name: isFirstProcessorNameInput.current ? '' : ProcessorName.isValid(name) ? '' : ProcessorName.invalidMessage(name),
            productCollection: isFirstProductCollectionInput.current ? '' : ProcessorProductCollection.isValid(productCollection) ? '' : ProcessorProductCollection.invalidMessage(productCollection),
            numberModel: isFirstNumberModelInput.current ? '' : ProcessorNumberModel.isValid(productCollection) ? '' : ProcessorNumberModel.invalidMessage(productCollection),
            cores: ProcessorCores.isValid(cores) ? '' : ProcessorCores.invalidMessage(cores),
            frequency: ProcessorFrequency.isValid(frequency) ? '' : ProcessorFrequency.invalidMessage(frequency),
            threads: ProcessorHasThreads.isValid(threads) ? '' : ProcessorHasThreads.invalidMessage(threads),

        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [cores, frequency, name, numberModel, productCollection, threads])

    return {
        error,
        required,
        disabled
    }
}