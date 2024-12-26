import { Primitives } from "../../../../shared/domain/value-object/Primitives"
import { StatusId } from "../../status/domain/StatusId"

export class DeviceStockNumber {
    static readonly NAME_MIN_LENGTH = 2
    static readonly NAME_MAX_LENGTH = 10
    static errors: string = ''

    constructor(
        readonly value: string | null,
        private readonly status: Primitives<StatusId>
    ) {
        if (value === null || value === undefined || value === '') {
            this.value = null
        } else {
            this.value = value

            if (!DeviceStockNumber.isValid(this.value, this.status)) {
                throw new Error(DeviceStockNumber.invalidMessage())
            }
        }
    }

    private static updateError(error: string): void {
        this.errors = error
    }

    private static get errorsValue(): string {
        return this.errors
    }

    public static isValid(value: string | null, status: Primitives<StatusId>): boolean {
        if (!value) return true
        const errorMesagge: string[] = []
        const isNameValidLength = value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
        if (!(status === StatusId.StatusOptions.INALMACEN || status === StatusId.StatusOptions.PORDESINCORPORAR)) {
            DeviceStockNumber.errors = 'Si no está en almacén no se le puede agregar un numero de stock'
            return false
        }
        if (!isNameValidLength) {
            errorMesagge.push(`El Número de stock debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
        }
        this.updateError(errorMesagge.join(' '))
        return isNameValidLength
    }

    public static invalidMessage(): string {
        return this.errorsValue
    }
}
