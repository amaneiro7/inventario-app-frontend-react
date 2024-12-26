
export interface DefaultProcessorProps {
    id?: string
    name: string
    cores: number
    frequency: number
    threads: boolean
    numberModel: string
    productCollection: string
}

export interface FormProcessorErrors {
    name: string
    cores: string
    frequency: string
    threads: string
    numberModel: string
    productCollection: string
}

export interface FormProcessorDisabled {
    name: boolean
    cores: boolean
    frequency: boolean
    threads: boolean
    numberModel: boolean
    productCollection: boolean
}
export interface FormProcessorRequired {
    name: boolean
    cores: boolean
    frequency: boolean
    threads: boolean
    numberModel: boolean
    productCollection: boolean
}