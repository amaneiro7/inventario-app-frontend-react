import { lazy, Suspense, useState } from "react"
import { UserPassword } from "@/modules/user/user/domain/UserPassword"
import { type ChangePasswordParams } from "@/modules/user/user/application/changePassoword"
import { type UserEmail } from "@/modules/user/user/domain/UserEmail"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

interface Props {
    formId?: string
    errors: ChangePasswordParams
    formData: ChangePasswordParams
    userEmail:Primitives<UserEmail>
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleClose: () => void
    handleOpenModal: () => void
    isDisabled: boolean
}

const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const Button = lazy(async () => await import('@/sections/components/button/button'))
const CancelIcon = lazy(() => import('@/sections/components/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('@/sections/components/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))
const LockIcon = lazy(async () => await import('../../components/icon/LockIcon').then(m => ({ default: m.LockIcon })))
const UnlockIcon = lazy(async () => await import('../../components/icon/UnlockIcon').then(m => ({ default: m.UnlockIcon })))

export function ChangePassowrdForm({
    errors,
    formId,
    formData,
    userEmail,
    handleChange,
    handleSubmit,
    handleClose,
    handleOpenModal,
    isDisabled
}: Props) {
  const [toogleInputs, setToogleInputs] = useState({
    password: false,
    newPassword: false,
    reTypePassword: false
  })
  const handleToogleInputs = (name: 'password' | 'newPassword' | 'reTypePassword') => {
    setToogleInputs(prevState => ({ ...prevState, [name]: !prevState[name] }))      
  }
    return (
      <form
        className='p-4 rounded-2xl shadow bg-white grid md:grid-cols-2 gap-4'
        method='post'
        id={formId}
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4'>
          <div className='hidden'>
            <label htmlFor='email' className='sr-only'>Correo Electrónico</label>
            <input type='text' id='email' autoComplete='email' name='email' defaultValue={userEmail} />
          </div>
          
          <Input
            label='Clave Actual'
            type={toogleInputs.password ? 'text' : 'password'}
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={formData.password}
            errorMessage={errors.password}
            error={errors.password ? true : false}
            isRequired
            rightIcon={
                toogleInputs.password ? 
                  <UnlockIcon className='w-4 fill-black/60 aspect-square' /> : 
                  <LockIcon className='w-4 fill-black/60 aspect-square' />
                }
            onRightIconClick={() => handleToogleInputs('password')}
          />  
          
          
          <Input
            label='Nueva Clave'
            type={toogleInputs.newPassword ? 'text' : 'password'}
            name='newPassword'
            autoComplete='new-password'
            onChange={handleChange}
            value={formData.newPassword}
            errorMessage={errors.newPassword}
            error={errors.newPassword ? true : false}
            isRequired
            rightIcon={
                toogleInputs.newPassword ? 
                  <UnlockIcon className='w-4 fill-black/60 aspect-square' /> : 
                  <LockIcon className='w-4 fill-black/60 aspect-square' />
              }
            onRightIconClick={() => handleToogleInputs('newPassword')}
          />
          
          
          <Input
            label='Confirmación de Clave'
            type={toogleInputs.reTypePassword ? 'text' : 'password'}
            name='reTypePassword'
            autoComplete='new-password'
            onChange={handleChange}
            value={formData.reTypePassword}
            errorMessage={errors.reTypePassword}
            error={errors.reTypePassword ? true : false}
            isRequired
            rightIcon={
                toogleInputs.reTypePassword ? 
                  <UnlockIcon className='w-4 fill-black/60 aspect-square' /> : 
                  <LockIcon className='w-4 fill-black/60 aspect-square' />
              }
            onRightIconClick={() => handleToogleInputs('reTypePassword')}
          />
          
        </div>
        <div className='rounded text-sm bg-gray-200 p-4'>
          <p><strong>Nota:</strong> Su nueva clave debe cumplir las siguientes condiciones:</p>
          <ol className='ml-2'>
            <li>1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH} carácteres.</li>
            <li>2. Debe incluir caracteres alfabéticos (sensitivos a mayúsculas y minúsculas), numéricos y especiales.</li>
            <li>3. Los caracteres especiales válidos son ! . @ # $ % ^ & *</li>
          </ol>
        </div>
        <div />
        <div className='flex gap-4 justify-center'>
          <Button
            color='green'
            type='button'
            disabled={isDisabled}
            onClick={handleOpenModal}
            size='content'
            text='Continuar'
            hoverTranslation
            buttonSize='large'
            icon={
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <RightArrowIcon width={20} className='aspect-square fill-white' />
              </Suspense>
                    }
          />
          <Button
            type='button'
            color='gray'
            text='Reset'
            onClick={handleClose}
            size='content'
            hoverTranslation
            buttonSize='large'
            icon={
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <CancelIcon width={20} className='aspect-square' />
              </Suspense>
                    }
          />
        </div>
      </form>
    )
}
