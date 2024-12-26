import { lazy, memo } from "react"

const Table = lazy(async () => import("@/sections/components/Table/Table").then(m => ({ default: m.Table })))
const TableHeader = lazy(async () => import("@/sections/components/Table/TableHeader").then(m => ({ default: m.TableHeader })))
const TableBody = lazy(async () => import("@/sections/components/Table/TableBody").then(m => ({ default: m.TableBody })))
const TableRow = lazy(async () => import("@/sections/components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableHead = lazy(async () => import("@/sections/components/Table/TableHead").then(m => ({ default: m.TableHead })))

interface Props<T> {
  children?: React.ReactElement<T>
}

function DeviceTable<T>({ children }: Props<T>) {
  return (    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead size='small' name='Usuario' />
          <TableHead size='large' name='Ubicación' />
          <TableHead size='small' name='Serial' />
          <TableHead size='small' name='Categoria' />
          <TableHead size='small' name='Marca' />
          <TableHead size='xLarge' name='Modelo' />
          <TableHead size='small' name='Observaciones' />
          <TableHead size='xxSmall' name='' />
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>    
  )
}

export const DefaultDeviceTable = memo(DeviceTable)