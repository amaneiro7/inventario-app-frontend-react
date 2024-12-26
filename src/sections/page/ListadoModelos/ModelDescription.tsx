import React, { lazy, Suspense } from "react"
import { useExpendedRows } from "@/sections/Hooks/useExpendedRows"
import { type ModelApiresponse } from "@/modules/shared/domain/types/responseTypes"


interface Props {
  models: ModelApiresponse[]
}

const TableCell = lazy(async () => import("@/sections/components/Table/TableCell").then(m => ({ default: m.TableCell })))
const TableRow = lazy(async () => import("@/sections/components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableCellDescInfo = lazy(async () => import("@/sections/components/Table/TableCellDescInfo").then(m => ({ default: m.TableCellDescInfo })))
const TableCellDescription = lazy(async () => import("@/sections/components/Table/TableCellDescription").then(m => ({ default: m.TableCellDescription })))
const TableCellOpenIcon = lazy(async () => import("@/sections/components/Table/TableCellOpenIcon").then(m => ({ default: m.TableCellOpenIcon })))

export function ModelDescription({ models }: Props) {
  const { expandedRows, handleRowClick } = useExpendedRows()
  return (
    <>
      {
        models?.map(model => (
          <React.Fragment key={model.id}>
            <TableRow className={`[&>td]:cursor-pointer ${expandedRows.includes(model.id) && '[&>td]:bg-slate-200 [&>td]:border-b-slate-200'}`} onClick={() => handleRowClick(model.id)}>
              <TableCell size='small' value={model.category.name} />
              <TableCell size='large' value={model.brand.name} />
              <TableCell size='small' value={model.name} />              
              <TableCellOpenIcon open={expandedRows.includes(model.id)} />
            </TableRow>
            <Suspense>
              <TableCellDescription
                open={expandedRows.includes(model.id)}
                state={model}
                stateId={model.id}
                url={`/model/edit/${model.id}`}
                colspan={7}
              >
                {/* <TableCellDescInfo
                  title='Estatus'
                  text={model.status?.name ?? ""}
                /> */}
                

                <TableCellDescInfo
                  title='Última Actualización'
                  text={model.updatedAt ? new Date(model.updatedAt).toLocaleDateString() : ""}
                />
              </TableCellDescription>
            </Suspense>
          </React.Fragment>
        ))
      }
    </>
  )
}
