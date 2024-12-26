import { lazy, Suspense } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useModelContext } from "@/sections/Context/ModelProvider"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { type ModelApiresponse } from "@/sections/../modules/shared/domain/types/responseTypes"
import Loading from "@/sections/components/Loading"
import { LoadingTable } from "@/sections/page/ListWrapper/ListComputer/LodingTable"

const ListWrapper = lazy(async () => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper })))
const MainModelFilter = lazy(async () => import("@/sections/components/ListComponent/MainModelFIlter").then(m => ({ default: m.MainModelFilter })))
const ModelTable = lazy(async () => import("./ModelTable").then(m => ({ default: m.ModelTable })))
const ModelDescription = lazy(async () => import("./ModelDescription").then(m => ({ default: m.ModelDescription })))

export default function ListadoModelos() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { models, managePage, query, loading, addFilter, cleanFilters } = useModelContext()
  const { inputData, handleChange, handleClear } = useInputsData({ addFilter, cleanFilters, defaultInputData, initialInputData })

  return (
    <Suspense fallback={<Loading />}>
      <ListWrapper
        query={query}
        total={managePage.showingMessage}
        managePage={managePage}
        title='List de modelos'
        url='/model/add'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        mainFilter={
          <MainModelFilter
            handleChange={handleChange}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            id={inputData.id}
          />
        }
        table={
          <ModelTable>
            {loading
              ? <LoadingTable registerPerPage={managePage.limit} colspan={3} />
              : <ModelDescription models={models as ModelApiresponse[]} />}
          </ModelTable>
        }
      />
    </Suspense>

  )
}