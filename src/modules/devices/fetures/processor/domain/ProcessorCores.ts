import { NumberValueObject } from '../../../../shared/domain/value-object/NumberValueObject'

export class ProcessorCores extends NumberValueObject {
	static readonly MIN = 1
	static readonly MAX = 32
	static readonly STEPS = 2

	constructor(readonly value: number) {
		super(value)
		if (!ProcessorCores.isValid(value)) {
			throw new Error(ProcessorCores.invalidMessage(value))
		}
	}

	public static isValid(value: number): boolean {
		if (value < ProcessorCores.MIN && value > ProcessorCores.MAX)
			return false
		if (value % 2 !== 0 && value !== 1) return false
		return true
	}

	public static invalidMessage(value: number): string {
		return `"${value}" No es un valor válido para el numero de procesadores, El valor Debe estar entre ${ProcessorCores.MIN} y ${ProcessorCores.MAX} y ser par`
	}
}
