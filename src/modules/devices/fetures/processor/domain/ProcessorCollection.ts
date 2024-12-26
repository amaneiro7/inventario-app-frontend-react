export class ProcessorProductCollection {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 100
  
    constructor (readonly value: string) {
      if (!ProcessorProductCollection.isValid(value)) {
        throw new Error(ProcessorProductCollection.invalidMessage(value))
      }
    }
  
    public static isValid (value: string): boolean {
      return value.length >= ProcessorProductCollection.NAME_MIN_LENGTH && value.length <= ProcessorProductCollection.NAME_MAX_LENGTH
    }
  
    public static invalidMessage (value: string): string {
      return `El nombre ${value} no es válido. Debe tener entre ${ProcessorProductCollection.NAME_MIN_LENGTH} y ${ProcessorProductCollection.NAME_MAX_LENGTH} caracteres`
    }
  }
  