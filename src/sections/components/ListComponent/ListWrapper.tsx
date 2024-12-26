import { lazy, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Operator } from "@/modules/shared/domain/criteria/FilterOperators"
import { SpinnerSKCircle } from "../Loading/spinner-sk-circle"
import { useDownloadExcelFromServer } from "@/sections/utils/downloadExcelfromServer"
import { type FilterContainerRef } from "./FilterContainer/FilterContainer"
import { type TypeOfSiteId } from "@/modules/location/typeofsites/domain/typeOfSiteId"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"
import { type SearchByCriteriaQuery } from "@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type useHandlePage } from "@/sections/Hooks/useHandlePage"

const PageTitle = lazy(async () => import('../Typography/PageTitle'))
const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
const FilterSection = lazy(async () => import('./FilterSection').then(m => ({ default: m.FilterSection })))
const FilterContainer = lazy(async () => import("./FilterContainer/FilterContainer").then(m => ({ default: m.FilterContainer })))
const ButtonSection = lazy(async () => import("./buttonsection/ButtonSection").then((m) => ({ default: m.ButtonSection })))
const TypeOfSiteTabNav = lazy(async () => import("../tabs/TypeOfSiteTabNav").then((m) => ({ default: m.TypeOfSiteTabNav })))
const PaginationBar = lazy(async () => import("../Pagination/PaginationBar").then((m) => ({ default: m.PaginationBar })))

export function ListWrapper({
  total,
  title,
  loading,
  url,
  handleChange,
  handleClear,
  query,
  typeOfSiteId,
  mainFilter,
  otherFilter,
  table,
  managePage
}: {
  typeOfSiteId?: Primitives<TypeOfSiteId>
  title: string
  url: string
  total: string
  loading: boolean
  handleChange: (name: string, value: string, operator?: Operator) => void
  handleClear: () => void
  query: SearchByCriteriaQuery
  mainFilter: React.ReactElement
  otherFilter?: React.ReactElement
  table: React.ReactElement
  managePage?: ReturnType<typeof useHandlePage>
}) {
  const navigate = useNavigate()
  const filterContainerRef = useRef<FilterContainerRef>(null)
  const { download, isDownloading } = useDownloadExcelFromServer({ query })

  const handleFilter = () => { filterContainerRef.current?.handleOpen() }


  return (
    <>
      <PageTitle title={title} optionalText={!loading && `${total} resultados`} />
      <DetailsWrapper borderColor='blue'>
        <DetailsBoxWrapper>
          <FilterSection>
            {mainFilter}
            {otherFilter
              ? <FilterContainer ref={filterContainerRef}>{otherFilter}</FilterContainer>
              : null}
          </FilterSection>
          <ButtonSection
            handleExportToExcel={download}
            loading={isDownloading}
            handleAdd={() => { navigate(url) }}
            handleFilter={otherFilter ? handleFilter : undefined}
            handleClear={handleClear}
          />
        </DetailsBoxWrapper>

        <div className='w-full flex flex-col justify-start'>
          {typeOfSiteId !== undefined ?
            // <Suspense fallback={<div className='min-h-7 h-7' />}>
            <TypeOfSiteTabNav onChange={handleChange} value={typeOfSiteId} />
            // </Suspense>
            : null}

          {loading && <SpinnerSKCircle />}
          {table}
        </div>
        {!loading ? 
          <PaginationBar 
            totalPages={managePage?.totalPages}
            currentPage={managePage?.currentPage}
            limit={managePage?.limit}
            handlePageClick={managePage?.handlePageClick}
            handleLimitChange={managePage?.handleLimitChange}
          /> : null}
      </DetailsWrapper>
    </>
  )
}