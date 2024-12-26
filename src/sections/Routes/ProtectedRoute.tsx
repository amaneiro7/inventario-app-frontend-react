import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  isSignIn: boolean
}
export function ProtectedRoute({ children, isSignIn }: React.PropsWithChildren<Props>) {
  const location = useLocation()

  if (!isSignIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
