export class MACAddress {
	static readonly macAddressRegex =
		/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

	constructor(readonly value: string | null) {
		if (value === '' || value === undefined || value == null) {
			this.value = null
		} else {
			this.value = value
		}

		if (!MACAddress.isValid(this.value)) {
			throw new Error(MACAddress.invalidMessage(value))
		}
	}

	public static isValid(value: string | null): boolean {
		if (value === null || value === '') return true
		return this.macAddressRegex.test(value)
	}

	public static invalidMessage(
		value: string | null | '' | undefined
	): string {
		return `"${value}" no es una dirección MAC válida, Una Dirección IP válida debe tener un formato xx-xx-xx-xx-xx-xx de valores hexadecimales`
	}
}
