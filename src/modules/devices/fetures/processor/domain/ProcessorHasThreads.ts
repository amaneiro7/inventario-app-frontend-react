import { BooleanValueObject } from "../../../../shared/domain/value-object/BooleanValueObject";

export class ProcessorHasThreads extends BooleanValueObject {
    constructor(value: boolean) {
        super(value)

        if (!ProcessorHasThreads.isValid(value)) {
            throw new Error(ProcessorHasThreads.invalidMessage(value))
        }
    }

    public static isValid(value: boolean): boolean {
        return typeof value === "boolean"
    }

    public static invalidMessage(value: boolean): string {
        return `Este valor "${value}" no es un valor válido para los hilos del procesadors`
    }
}