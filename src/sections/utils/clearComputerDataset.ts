import { type DevicesApiResponse } from "../../modules/shared/domain/types/responseTypes"
import { type ClearDataset } from "../../types/types"
import { lastHistoryUpdated } from "./lastHistoryUpdated"

export function clearComputerDataset({ devices }: { devices: DevicesApiResponse[] }): ClearDataset[] {
    return devices.map(device => ({
        id: device?.id,
        Usuario: device?.employee?.userName ?? 'Sin Asignar',
        "Ubicación": device?.location?.name,
        "Dirección IP": device?.computer?.ipAddress ?? '',
        Serial: device?.serial ?? 'Sin Serial',
        Activo: device?.activo ?? 'Sin Activo',
        Estatus: device?.status?.name,
        Categoria: device?.category?.name,
        Marca: device?.brand?.name,
        Modelo: device?.model?.name,
        "Nombre de Equipo": device?.computer?.computerName ?? '',
        Procesador: device?.computer.processor?.name ?? 'Sin Procesador',
        "Memoria Ram Total": device?.computer?.memoryRamCapacity,
        "Slot de Memoria Ram": device?.computer?.memoryRam.map(mem => mem).join("_"),
        "Tipo de Memoria Ram": device?.model?.modelComputer ? device?.model?.modelComputer?.memoryRamType?.name : device?.model.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : null,
        "Disco Duro Total": device?.computer?.hardDriveCapacity?.name ?? '',
        "Tipo de Disco Duro": device?.computer?.hardDriveType?.name ?? '',
        "Sistema Operativo": device?.computer?.operatingSystem?.name ?? '',
        "Arquitectura": device?.computer?.operatingSystemArq?.name ?? '',
        Observación: device?.observation,
        "Actualizado por": lastHistoryUpdated(device?.history)?.user?.email ?? 'root',
        "Fecha de Modificación": new Date(device?.updatedAt).toLocaleDateString()
    }))
}

