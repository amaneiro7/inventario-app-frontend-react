export function getValueFromQueryParams(defaultInputData: object) {
  const params = new URLSearchParams(window.location.search)
  // Obtener las llaves del initialState InputData
  const inputDataArray = Object.keys(defaultInputData)
  // Obtener el valor de los parametros searchParam, si no existe que ese valor sea 0
  return inputDataArray.map(key => {
    return { [key]: params.get(key) ?? '' }
  }).reduce((obj, item) => {
    const key = Object.keys(item)[0]
    const value = item[key]
    obj[key] = value
    return obj
  }, {})
}