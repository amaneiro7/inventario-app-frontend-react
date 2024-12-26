import { lazy, memo, Suspense } from 'react'
import { useLogin } from './useLogin'

const Logo = lazy(async () => await import('@/sections/components/Logo/Logo'))
const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const PageTitle = lazy(async () => await import('@/sections/components/Typography/PageTitle'))
const Button = lazy(async () => await import('@/sections/components/button/button'))
const Copyright = lazy(async () => await import('@/sections/components/Copyright').then(m => ({ default: m.Copyright })))
const CircleSpinningIcon = lazy(() => import('@/sections/components/icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon })))
const LockIcon = lazy(async () => await import('@/sections/components/icon/LockIcon').then(m => ({ default: m.LockIcon })))
const UnlockIcon = lazy(async () => await import('@/sections/components/icon/UnlockIcon').then(m => ({ default: m.UnlockIcon })))
const MailIcon = lazy(async () => await import('@/sections/components/icon/MailIcon').then(m => ({ default: m.MailIcon })))

export const FormLogin = memo(() => {
  const { formData, errors, loading, valid, handleChange, handleSubmit, handleToggleShowPassowrd, toggleShowPassword } = useLogin()
  
  return (
    <main className='bg-gray-300 dark:bg-gray-900'>
      <section className='flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700'>
          
          <Logo />

          <PageTitle title='Iniciar Sesión' />

          <form id='login' action='submit' onSubmit={handleSubmit}>
            <div className='space-y-6 md:space-y-8 mb-20'>
              
              <Input
                leftIcon={<MailIcon className='w-4 fill-black/60 aspect-square' />}
                label='Correo Electrónico'
                type='email'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                value={formData.email}
                errorMessage={errors.email}
                error={errors.email ? true : false}
                valid={valid.email}
                isRequired
              />
              
              
              <Input
                leftIcon={<LockIcon className='w-4 fill-black/60 aspect-square' />}
                label='Contraseña'
                type={toggleShowPassword ? 'text' : 'password'}
                name='password'
                autoComplete='current-password'
                onChange={handleChange}
                value={formData.password}
                errorMessage={errors.password}
                error={errors.password ? true : false}
                valid={valid.password}
                rightIcon={
                    toggleShowPassword 
                    ? <Suspense><UnlockIcon className='w-4 fill-black/60 aspect-square' /> </Suspense>
                    : <Suspense><LockIcon className='w-4 fill-black/60 aspect-square' /></Suspense>
                  }
                onRightIconClick={handleToggleShowPassowrd}
                isRequired
              />
              

            </div>

            <Button
              buttonSize='large'
              color='blue'
              size='full'
              disabled={loading}
              text={loading ? 'Cargando...' : 'Ingresar'}
              type='submit'
              icon={
                loading
                  ? <Suspense><CircleSpinningIcon width={20} /></Suspense>
                  : null
              }
            />

          </form>
        </div>
        <footer>
          <Copyright />
        </footer>
      </section>
    </main>
  )
})