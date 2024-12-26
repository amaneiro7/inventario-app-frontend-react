import { lazy, memo, Suspense } from "react"
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading"


interface Props {
  handleClear: () => void
  handleAdd: () => void
  handleExportToExcel: () => void
  loading?: boolean
  handleFilter?: () => void
}

const Button = lazy(async () => import("../../button/button"))
const DownloadIcon = lazy(async () => import("../../icon/DownloadIcon").then((m) => ({ default: m.DownloadIcon })))
const CircleSpinningIcon = lazy(() => import('../../icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon })))
const AddIcon = lazy(async () => import("../../icon/AddIcon").then((m) => ({ default: m.AddIcon })))
const FilterIcon = lazy(async () => import("../../icon/FilterIcon").then((m) => ({ default: m.FilterIcon })))

export const ButtonSection = memo(({ loading, handleFilter, handleAdd, handleClear, handleExportToExcel }: Props) => {
  return (
    <section className='my-4 min-h-8 flex gap-2'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          color='green'
          size='full'
          text={loading ? 'Descargando' : `Descargar`}
          buttonSize='medium'
          disabled={loading}
          icon={
            loading ? (
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <CircleSpinningIcon width={20} />
              </Suspense>
            ) : (
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <DownloadIcon width={20} className='aspect-square' />
              </Suspense>
            )
          }
          onClick={handleExportToExcel}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          text='Añadir'
          color='orange'
          size='content'
          onClick={handleAdd}
          buttonSize='medium'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <AddIcon width={20} fill='white' className='aspect-square' />
            </Suspense>
          }
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          color='secondary'
          size='content'
          type='button'
          buttonSize='medium'
          text='Limpiar'
          onClick={handleClear}
        />
      </Suspense>
      {handleFilter ?
        <Suspense fallback={<InputSkeletonLoading />}>
          <Button
            type='button'
            color='secondary'
            size='content'
            text='Filtros'
            buttonSize='medium'
            onClick={handleFilter}
            icon={
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <FilterIcon width={14} className='aspect-square' />
              </Suspense>
            }
          />
        </Suspense>
        : null}
    </section>
  )
})