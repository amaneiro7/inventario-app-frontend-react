import { Primitives } from "../../../../shared/domain/value-object/Primitives";
import { StatusId } from "../../../devices/status/domain/StatusId";
import { MemoryRamValues } from "../../memoryRam/memoryRamCapacity/domain/MemoryRamValue";

export class MemoryRam {
    constructor(readonly value: MemoryRamValues[]) { }

    public toPrimitives(): Primitives<MemoryRamValues>[] {
        return this.value.map(memValue => memValue.value)
    }

    static fromPrimitives(memoryRamValues: Primitives<MemoryRamValues>[], status: Primitives<StatusId>) {
        if (!MemoryRam.isValid(memoryRamValues, status)) {
            throw new Error(MemoryRam.invalidMessage())
        }
        return new MemoryRam(memoryRamValues.map(MemoryRamValues.fromValues))
    }

    public static isValid(value: Primitives<MemoryRamValues>[], status: Primitives<StatusId>): boolean {
        if ([
            StatusId.StatusOptions.INUSE,
            StatusId.StatusOptions.PRESTAMO,
            StatusId.StatusOptions.CONTINGENCIA,
            StatusId.StatusOptions.GUARDIA
        ].includes(status) && MemoryRam.isZeroTotalMemory(value) && !this.isEmpty(value)) {
            return false
        }
        return true
    }

    public static invalidMessage(): string {
        return 'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso'
    }

    private static isEmpty(value: Primitives<MemoryRamValues>[]): boolean {
        return value?.length === 0
    }

    static totalAmount(value: Primitives<MemoryRamValues>[]): number {
        if (!value) return
        let number = 0
        for (let totalAmount = 0; totalAmount < value.length; totalAmount++) {
            number += Number(value[totalAmount])
        }
        return number
    }

    public static isZeroTotalMemory(value: Primitives<MemoryRamValues>[]): boolean {
        return this.totalAmount(value) === 0
    }
}