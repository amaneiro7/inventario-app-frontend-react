import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'
import { AuthContextProvider } from '@/sections/Context/AuthContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'
import Loading from '../sections/components/Loading/index.tsx'

const AppRoutes = lazy(async () => await import('../sections/Routes/routes.tsx'))
const ToasterComponent = lazy(async () => import('../sections/utils/toaster.tsx').then(m => ({ default: m.ToasterComponent })))

function App() {
  return (    
    <ErrorBoundary>
      <BrowserRouter
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
      >
        <AuthContextProvider repository={apiRepository}>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
            
          </Suspense>
          <Suspense>
            
            <ToasterComponent />
          </Suspense>
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>    
  )
}

export default App
