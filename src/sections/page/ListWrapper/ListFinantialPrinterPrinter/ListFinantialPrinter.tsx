import { lazy, Suspense } from "react"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import { type DevicesApiResponse } from "@/sections/../modules/shared/domain/types/responseTypes"

import Loading from "@/sections/components/Loading"
import { LoadingTable } from "@/sections/page/ListWrapper/ListComputer/LodingTable"

const ListWrapper = lazy(() => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper})))
const MainComputerFilter = lazy(async () => import("@/sections/components/ListComponent/MainComputerFilter").then(m => ({ default: m.MainComputerFilter })))
const DeviceTable = lazy(() => import("../DeviceDefaultTable").then(m => ({ default: m.DefaultDeviceTable })))
const FinantialPrinterDescription = lazy(() => import("./FinantialPrintersDescription").then(m => ({ default: m.FinantialPrinterDescription })))
export default function ListFinantialPrinter() {        
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { devices, managePage, loading, addFilter, cleanFilters, query } = useDeviceContext()
  const { inputData, handleChange, handleClear } = useInputsData({ initialInputData, defaultInputData, addFilter, cleanFilters })
  
    return (    
      <Suspense fallback={<Loading />}>
        <ListWrapper
          total={managePage.showingMessage}
          title='Lista de impresoras Financieras'
          url='/device/add'
          loading={loading}
          handleChange={handleChange}
          handleClear={handleClear}
          query={query}
          typeOfSiteId={inputData.typeOfSiteId}
          managePage={managePage}
          mainFilter={
            <MainComputerFilter 
              handleChange={handleChange}
              categoryId={inputData.categoryId}
              employeeId={inputData.employeeId}
              locationId={inputData.locationId}
              regionId={inputData.regionId}
              serial={inputData.serial}
              typeOfSiteId={inputData.typeOfSiteId}
            />  
          }
          table={
            <DeviceTable>
              {loading
                ? <LoadingTable registerPerPage={managePage.limit} colspan={7} />
                : <FinantialPrinterDescription devices={devices as DevicesApiResponse[]} />}
            </DeviceTable>
            }
        />
      </Suspense>  
    )}