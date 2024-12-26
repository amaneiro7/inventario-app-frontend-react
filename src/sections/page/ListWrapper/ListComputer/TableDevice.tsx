import React, { lazy, Suspense } from "react"
import { LoadingTable } from "@/sections/page/ListWrapper/ListComputer/LodingTable"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"
import { useExpendedRows } from "@/sections/Hooks/useExpendedRows"

const Table = lazy(async () => import("@/sections/components/Table/Table").then(m => ({ default: m.Table })))
const TableHeader = lazy(async () => import("@/sections/components/Table/TableHeader").then(m => ({ default: m.TableHeader })))
const TableRow = lazy(async () => import("@/sections/components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableBody = lazy(async () => import("@/sections/components/Table/TableBody").then(m => ({ default: m.TableBody })))
const TableHead = lazy(async () => import("@/sections/components/Table/TableHead").then(m => ({ default: m.TableHead })))
const TableCell = lazy(async () => import("@/sections/components/Table/TableCell").then(m => ({ default: m.TableCell })))
const TableCellOpenIcon = lazy(async () => import("@/sections/components/Table/TableCellOpenIcon").then(m => ({ default: m.TableCellOpenIcon })))
const ComputerDescription = lazy(async () => import("./ComputerDescription").then(m => ({ default: m.ComputerDescription })))

interface Props {
    devices: DevicesApiResponse[]
    loading: boolean
    limit?: number
}

export function TableWrapper({ devices, loading = true, limit = 25 }: Props) {
    const { expandedRows, handleRowClick } = useExpendedRows()
    
    return (      
      <Table>
        <TableHeader>        
          <TableRow>
            <TableHead size='small' name='Usuario' />
            <TableHead size='large' name='Ubicación' />
            <TableHead size='small' name='Dirección IP' />
            <TableHead size='small' name='Serial' />          
            <TableHead size='small' name='Categoria' />
            <TableHead size='small' name='Marca' />
            <TableHead size='xLarge' name='Modelo' />
            <TableHead size='small' name='Nombre de Equipo' />              
            <TableHead size='small' name='Observaciones' />
            <TableHead size='xxSmall' name='' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading 
          ? <LoadingTable colspan={9} registerPerPage={limit} />
          : devices?.map(device => (
            <React.Fragment key={device.id}>
              <TableRow className={`[&>td]:cursor-pointer ${expandedRows.includes(device.id) && '[&>td]:bg-slate-200 [&>td]:border-b-slate-200'}`} onClick={() => handleRowClick(device.id)}>                  
                <TableCell size='small' value={device.employee?.userName} />
                <TableCell size='large' value={device.location?.name} />
                <TableCell size='small' value={device.computer?.ipAddress} />
                <TableCell size='small' value={device.serial} />
                <TableCell size='small' value={device.category?.name} />
                <TableCell size='small' value={device.brand?.name} />
                <TableCell size='xLarge' value={device.model?.name} />
                <TableCell size='small' value={device.computer?.computerName} />
                <TableCell size='small' value={device.observation} />
                <TableCellOpenIcon open={expandedRows.includes(device.id)} />
              </TableRow>
              <Suspense>
                <ComputerDescription 
                  open={expandedRows.includes(device.id)}
                  device={device}
                />
              </Suspense>
            </React.Fragment>
            ))}
        </TableBody>
      </Table>
    )}