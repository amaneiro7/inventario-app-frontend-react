import { type Source } from '@/modules/shared/domain/types/types'
import { saveAs } from 'file-saver'

export const fileSaver = (data: Blob | string, source: Source) => {
    const now = new Date()
    const filename = `Reporte-Inventario-${source}${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    return saveAs(data, filename)
}