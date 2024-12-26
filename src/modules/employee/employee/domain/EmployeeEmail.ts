export class EmployeeEmail {
  static readonly validEmailRegExp =
    /^(?=.*[@](?:bnc\.com\.ve|banconacionaldecredito\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

  constructor (readonly value: string) {
    if (!EmployeeEmail.isValid(value)) {
      throw new Error(EmployeeEmail.invalidMessage(value))
    }
  }

  public static isValid (value: string): boolean {
    return EmployeeEmail.validEmailRegExp.test(value)
  }

  public static invalidMessage (value: string): string {
    return `El email ${value} no es válido.`
  }
}
