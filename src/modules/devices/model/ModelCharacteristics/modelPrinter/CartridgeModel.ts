export class CartridgeModel {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 20
  
    constructor (readonly value: string) {
      if (!CartridgeModel.isValid(value)) {
        throw new Error(CartridgeModel.invalidMessage(value))
      }
    }
  
    public static isValid (value: string): boolean {
      return value.length >= CartridgeModel.NAME_MIN_LENGTH && value.length <= CartridgeModel.NAME_MAX_LENGTH
    }
  
    public static invalidMessage (value: string): string {
      return `El model ${value} no es válido. Debe tener entre ${CartridgeModel.NAME_MIN_LENGTH} y ${CartridgeModel.NAME_MAX_LENGTH} caracteres`
    }
  }
  