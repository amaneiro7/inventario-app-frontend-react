import { lazy } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const FormLogin = lazy(() => import('./FormLogin').then(m => ({ default: m.FormLogin })))

export default function Login({ isSignIn }: { isSignIn: boolean | null }) {
  const location = useLocation()

  if (!isSignIn) {
    return <FormLogin />
  }

  return <Navigate to={location?.state?.from?.pathName ?? '/'} replace />
}

