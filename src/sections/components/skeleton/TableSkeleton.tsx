import { TableRowSkeleton } from "./TableRowSkeleton"

export function TableSkeleton() {
  return (
    <table className="shadow rounded-md p-4 max-w-full w-full mx-auto flex-1">
      <thead className="h-full animate-pulse flex flex-col gap-6">
        <tr>
          <th className="animate-pulse h-6 w-full bg-slate-700 rounded"></th>
        </tr>
      </thead>
      <tbody>
        <TableRowSkeleton totalTd={1}/>
      </tbody>
    </table>
  );
}

export default TableSkeleton