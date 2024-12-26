import { utils, writeFile } from 'xlsx'
import { type ClearModelDataset, type ClearDataset } from '../../types/types'

export async function jsonToExcel({ clearDataset }: { clearDataset: ClearDataset[] | ClearModelDataset[] }) {
    const worksheet = utils.json_to_sheet(clearDataset)
    worksheet["!cols"] = [{ wch: 20 }]
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Inventario')
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    writeFile(workbook, filename, { compression: true })
    
}