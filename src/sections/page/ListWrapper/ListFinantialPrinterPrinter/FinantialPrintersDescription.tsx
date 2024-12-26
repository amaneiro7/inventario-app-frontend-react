import React, { lazy, Suspense } from "react"
import { useExpendedRows } from "@/sections/Hooks/useExpendedRows"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

interface Props {
  devices: DevicesApiResponse[]
}

const TableCell = lazy(async () => import("@/sections/components/Table/TableCell").then(m => ({ default: m.TableCell })))
const TableRow = lazy(async () => import("@/sections/components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableCellDescInfo = lazy(async () => import("@/sections/components/Table/TableCellDescInfo").then(m => ({ default: m.TableCellDescInfo })))
const TableCellDescription = lazy(async () => import("@/sections/components/Table/TableCellDescription").then(m => ({ default: m.TableCellDescription })))
const TableCellOpenIcon = lazy(async () => import("@/sections/components/Table/TableCellOpenIcon").then(m => ({ default: m.TableCellOpenIcon })))

export function FinantialPrinterDescription({ devices }: Props) {
  const { expandedRows, handleRowClick } = useExpendedRows()
  return (
    <>
      {
        devices?.map(device => (
          <React.Fragment key={device.id}>
            <TableRow className={`[&>td]:cursor-pointer ${expandedRows.includes(device.id) && '[&>td]:bg-slate-200 [&>td]:border-b-slate-200'}`} onClick={() => handleRowClick(device.id)}>
              <TableCell size='small' value={device.employee?.userName} />
              <TableCell size='large' value={device.location?.name} />
              <TableCell size='small' value={device.serial} />
              <TableCell size='small' value={device.category?.name} />
              <TableCell size='small' value={device.brand?.name} />
              <TableCell size='xLarge' value={device.model?.name} />
              <TableCell size='small' value={device.observation} />
              <TableCellOpenIcon open={expandedRows.includes(device.id)} />
            </TableRow>
            <Suspense>
              <TableCellDescription
                open={expandedRows.includes(device.id)}
                state={device}
                stateId={device.id}
                url={`/device/edit/${device.id}`}
                colspan={7}
              >
                <TableCellDescInfo
                  title='Estatus'
                  text={device.status?.name ?? ""}
                />
                <TableCellDescInfo
                  title='Activo'
                  text={device.activo ?? "Sin Activo"}
                />
                <TableCellDescInfo
                  title='Última Actualización'
                  text={device.updatedAt ? new Date(device.updatedAt).toLocaleDateString() : ""}
                />
              </TableCellDescription>
            </Suspense>
          </React.Fragment>
        ))
      }
    </>
  )
}
