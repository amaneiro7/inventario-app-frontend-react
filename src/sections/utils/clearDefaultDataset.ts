import { type DevicesApiResponse } from "../../modules/shared/domain/types/responseTypes";
import { type ClearDataset } from "../../types/types";
import { lastHistoryUpdated } from "./lastHistoryUpdated";

export function clearDefaultDataset({ devices }: { devices: DevicesApiResponse[] }): ClearDataset[] {
    return devices.map(device => ({
        id: device?.id,
        Usuario: device?.employee?.userName ?? 'Sin Asignar',
        "Ubicación": device?.location?.name,
        Serial: device?.serial ?? 'Sin Serial',
        Activo: device?.activo ?? 'Sin Activo',
        Estatus: device?.status?.name,
        Categoria: device?.category?.name,
        Marca: device?.brand?.name,
        Modelo: device?.model?.name,
        Observación: device?.observation,
        "Actualizado por": lastHistoryUpdated(device?.history)?.user?.email ?? 'root',
        "Fecha de Modificación": new Date(device?.updatedAt).toLocaleDateString()
    }))
}