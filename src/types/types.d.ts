export type ClearDataset = {
  id: string
  Usuario: string
  "Ubicación": string
  "Dirección IP"?: string
  Serial: string
  Activo: string
  Estatus: string
  Categoria: string
  Marca: string
  Modelo: string
  "Nombre de Equipo"?: string
  Procesador?: string
  "Memoria Ram Total"?: number
  "Slot de Memoria Ram"?: string
  "Tipo de Memoria Ram"?: string
  "Disco Duro Total"?: string
  "Tipo de Disco Duro"?: string
  "Sistema Operativo"?: string
  "Arquitectura"?: string
  Observación: string
  "Actualizado por"?: string
  "Fecha de Modificación": string
}
export type ClearModelDataset = {
  id: string
  Categoria: string
  Marca: string
  Modelo: string
  "Tipo de Memoria"?: string
  "Cantidad de Ranuras"?: number | string
  "Puerto VGA"?: string
  "Puerto HDMI"?: string
  "Puerto DVI"?: string
  "Adaptador Bluetooth"?: string
  "Adaptador Wifi"?: string
  "Modelo de Bateria"?: string
  "Tamaño de Pantalla"?: string
  "Modelo de Cartucho"?: string
  "Tipo de entrada"?: string
  "Lector de Huella"?: string
  "Fecha de Modificación": string
}
