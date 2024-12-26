// import { lazy, memo } from "react"
// import { CategorySelected } from "./ModelTable"

// const Table = lazy(async () => import("../../components/TableComponent/Table2"))
// const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
// const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
// const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
// const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))

// export const TableWraper = memo(({
//   children,
//   style,
//   categorySelected: {
//     isComputer,
//     isKeyboard,
//     isLaptop,
//     isMonitor,
//     isPrinter,
//     isMouse,
//   }
// }: {
//   children: React.ReactNode
//   style: React.CSSProperties,
//   categorySelected: CategorySelected
// }) => (
//   <Table className='overflow-hidden'>
//     <TableHeader>
//       <TableRow>
//         <TableHead style={{ width: '80px' }} size='min-w-20' name='Acciones' />
//         <TableHead style={{ width: '112px' }} size='min-w-28' name='Categoria' />
//         <TableHead style={{ width: '112px' }} size='min-w-28' name='Marca' />
//         <TableHead style={{ width: '240px' }} size='min-w-60' name='Modelo' />
//         {!(isMonitor || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Tipo de Memoria' />}
//         {!(isMonitor || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '144px' }} size='min-w-36' name='Cantidad de Ranuras' />}
//         {!(isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Puerto VGA' />}
//         {!(isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Puerto DVI' />}
//         {!(isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Puerto HDMI' />}
//         {!(isMonitor || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '144px' }} size='min-w-36' name='Adaptador Bluetooth' />}
//         {!(isMonitor || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Adaptador Wifi' />}
//         {!(isComputer || isMonitor || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Modelo de bateria' />}
//         {!(isComputer || isLaptop || isPrinter || isKeyboard || isMouse) && <TableHead style={{ width: '144px' }} size='min-w-36' name='Tamaño de Pantalla' />}
//         {!(isComputer || isLaptop || isMonitor || isKeyboard || isMouse) && <TableHead style={{ width: '144px' }} size='min-w-36' name='Modelo de cartucho' />}
//         {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Tipo de entrada' />}
//         {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead style={{ width: '128px' }} size='min-w-32' name='Lector de huella' />}
//         <TableHead style={{ width: '100%', minWidth: '100%' }} name='' />
//       </TableRow>

//     </TableHeader>
//     <TableBody className='relative' style={style}>
//       {children}
//     </TableBody>
//   </Table>
// ))