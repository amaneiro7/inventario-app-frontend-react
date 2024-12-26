import { memo, useMemo } from "react"
import { lastHistoryUpdated } from "../utils/lastHistoryUpdated"
import { type HistoryApiResponse } from "@/modules/shared/domain/types/responseTypes"


export const UpdatedBy = memo(({ history }: { history: HistoryApiResponse[] }) => {
  const sortHistroy = useMemo(() => (
    lastHistoryUpdated(history)
  ), [history])
  return (
    <span className='block'>Realizado por <strong>{sortHistroy?.user?.email ?? 'root'}</strong> </span>
  )
})