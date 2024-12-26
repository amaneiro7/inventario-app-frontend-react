import { type ModelApiresponse } from "../../modules/shared/domain/types/responseTypes";
import { type ClearModelDataset } from "../../types/types";

export function clearModelDataset({ models }: { models: ModelApiresponse[] }): ClearModelDataset[] {
    return models.map(model => ({
        id: model?.id,
        Categoria: model?.category?.name,
        Marca: model?.brand?.name,
        Modelo: model?.name,
        "Tipo de Memoria": (model?.modelComputer?.memoryRamType?.name || model?.modelLaptop?.memoryRamType?.name) ?? 'N/A',
        "Cantidad de Ranuras": (model?.modelComputer?.memoryRamSlotQuantity || model?.modelLaptop?.memoryRamSlotQuantity) ?? 'N/A',
        "Puerto VGA": (model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasVGA || model?.modelLaptop?.hasVGA || model?.modelMonitor?.hasVGA ? 'Si' : 'No') : 'N/A',
        "Puerto HDMI": (model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasDVI || model?.modelLaptop?.hasDVI || model?.modelMonitor?.hasDVI ? 'Si' : 'No') : 'N/A',
        "Puerto DVI": (model?.modelComputer || model?.modelLaptop || model?.modelMonitor) ? (model?.modelComputer?.hasHDMI || model?.modelLaptop?.hasHDMI || model?.modelMonitor?.hasHDMI ? 'Si' : 'No') : 'N/A',
        "Adaptador Bluetooth": (model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasBluetooth || model?.modelLaptop?.hasBluetooth ? 'Si' : 'No') : 'N/A',
        "Adaptador Wifi": (model?.modelComputer || model?.modelLaptop) ? (model?.modelComputer?.hasWifiAdapter || model?.modelLaptop?.hasWifiAdapter ? 'Si' : 'No') : 'N/A',
        "Modelo de Bateria": model?.modelLaptop?.batteryModel ?? 'N/A',
        "Tamaño de Pantalla": model?.modelMonitor ? `${model?.modelMonitor.screenSize} pulgadas` : 'N/A',
        "Modelo de Cartucho": model?.modelPrinter?.cartridgeModel ?? 'N/A',
        "Tipo de entrada": model?.modelKeyboard?.inputType?.name ?? 'N/A',
        "Lector de Huella": model?.modelKeyboard ? (model?.modelKeyboard?.hasFingerPrintReader ? 'Si' : 'No') : 'N/A',
        "Fecha de Modificación": new Date(model?.updatedAt).toLocaleDateString()
    }))
}