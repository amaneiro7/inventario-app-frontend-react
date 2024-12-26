import { lazy } from "react";

const PaginationList = lazy(async () => import( "./PaginationList").then(m => ({ default: m.PaginationList })))
const RecordPerPage = lazy(async () => import("./RecordPerPage").then(m => ({ default: m.RecordPerPage })))

export function PaginationBar({
  totalPages,
  currentPage,
  handlePageClick,
  handleLimitChange,
  limit
}: {
  totalPages: number
  currentPage: number
  limit: number
  handlePageClick: ({ selected }: { selected: number }) => void
  handleLimitChange: (limit: number) => void
}) {
    return (
      <nav 
        aria-label='pagination-bar' 
        className='flex justify-between items-center'
      >
        <RecordPerPage
          limit={limit}
          handleLimitChange={handleLimitChange}
        />
        <PaginationList
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      </nav>
    )
}
