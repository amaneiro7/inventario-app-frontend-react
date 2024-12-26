export class ProcessorNumberModel {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 100
  
    constructor (readonly value: string) {
      if (!ProcessorNumberModel.isValid(value)) {
        throw new Error(ProcessorNumberModel.invalidMessage(value))
      }
    }
  
    public static isValid (value: string): boolean {
      return value.length >= ProcessorNumberModel.NAME_MIN_LENGTH && value.length <= ProcessorNumberModel.NAME_MAX_LENGTH
    }
  
    public static invalidMessage (value: string): string {
      return `El nombre ${value} no es válido. Debe tener entre ${ProcessorNumberModel.NAME_MIN_LENGTH} y ${ProcessorNumberModel.NAME_MAX_LENGTH} caracteres`
    }
  }
  