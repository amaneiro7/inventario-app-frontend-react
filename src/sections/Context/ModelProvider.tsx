import { createContext, useContext, useEffect } from "react"
import { type SearchByCriteriaQuery } from "../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type ModelPrimitives } from "../../modules/devices/model/model/domain/Model"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { useModelByCriteria } from "../Hooks/model/useModelByCriteria"
import { useCreateModel } from "../Hooks/model/useCreateModel"
import { useHandlePage } from "../Hooks/useHandlePage"


export interface ModelContextState {
    models: ModelPrimitives[]
    total: number
    error: string
    loading: boolean
    createModel: (formData: ModelPrimitives) => Promise<void>    
    addFilter: (payload: SearchByCriteriaQuery) => void
    cleanFilters: () => void
    query: SearchByCriteriaQuery
    managePage: ReturnType<typeof useHandlePage>
}

export const ModelContext = createContext({} as ModelContextState)

export const ModelContextProvider = ({ children }: React.PropsWithChildren) => {
    const { models, total, loading, error, searchModelsByCriteria, reset } = useModelByCriteria()
    const { addFilter, cleanFilters, query } = useSearchByCriteriaQuery()
    const { createModel } = useCreateModel()

    const handleCreate = async (formData: ModelPrimitives) => {
      const res = await createModel(formData)
      searchModelsByCriteria(query)
      return res
    }

    const managePage = useHandlePage({ 
      addFilter,
      limit: query.limit,
      offset: query.offset,
      total,
     })

  useEffect(() => {
    searchModelsByCriteria(query)

    return () => {
      reset()
    }
  }, [query, reset, searchModelsByCriteria])

  return (
    <ModelContext.Provider value={{
        models,
        total,
        error,
        loading,
        createModel: handleCreate,
        addFilter,
        cleanFilters, 
        query,
        managePage,
      }}
    >
      {children}
    </ModelContext.Provider>
)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModelContext = () => {
    const context = useContext(ModelContext)
    if (context === undefined) {
        throw new Error("useModelContext must be used within a ModelContextProvider")
    }
    return context
}