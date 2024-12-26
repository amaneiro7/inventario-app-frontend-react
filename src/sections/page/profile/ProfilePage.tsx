import { lazy, Suspense } from "react"
import { useAuthContext } from "@/sections/Context/AuthContext"
import { useChangePassword } from "./useChangePassword"
import { type UserApiResponse } from "@/modules/shared/domain/types/responseTypes"
import Loading from "@/sections/components/Loading"

const StepsToFollow = lazy(async () => import("@/sections/components/stepsToFollow/StepsToFollow").then(m => ({ default: m.StepsToFollow })))
const ChangePasswordStepsToFollow = lazy(async () => import("./ChangePasswordStepsToFollow").then(m => ({ default: m.ChangePasswordStepsToFollow })))
const ConfirmationModal = lazy(async () => import("@/sections/components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const DetailsWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsInfo = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsInfo").then(m => ({ default: m.DetailsInfo })))
const DescriptionListElement = lazy(async () => import('@/sections/components/DetailsWrapper/DescriptionListElement').then(m => ({ default: m.DescriptionListElement })))
const DescriptionDesc = lazy(async () => import('@/sections/components/DetailsWrapper/DescriptionDesc').then(m => ({ default: m.DescriptionDesc })))
const PageTitle = lazy(async () => import("@/sections/components/Typography/PageTitle"))
const Modal = lazy(async () => import('@/sections/components/Dialog/Modal').then(m => ({ default: m.Modal })))
const ChangePassowrdForm = lazy(async () => import("./ChangePassowrdForm").then(m => ({ default: m.ChangePassowrdForm })))


export default function ProfilePage() {
  const { useAuth: { user } } = useAuthContext()
  const { user: { name, email, lastName, role } } = user as unknown as UserApiResponse

  const { formId, errors, formData, handleChange, handleSubmit, handleClose, dialogRef, handleCloseModal, handleOpenModal, isDisabled } = useChangePassword()

  return (
    <Suspense fallback={<Loading />}>
      <PageTitle title='Perfil de usuario' />
      
      <DetailsWrapper title='A continuación le indicamos los datos de contacto'>          
        <DetailsInfo title='Datos de Contacto'>
          <DescriptionListElement title='Nombre'><DescriptionDesc desc={name} /></DescriptionListElement>
          <DescriptionListElement title='Apellido'><DescriptionDesc desc={lastName} /></DescriptionListElement>
          <DescriptionListElement title='Correo'><DescriptionDesc desc={email} /></DescriptionListElement>
          <DescriptionListElement title='Role'><DescriptionDesc desc={role?.name} /></DescriptionListElement>
        </DetailsInfo>
          
        <ChangePassowrdForm
          userEmail={email}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          handleOpenModal={handleOpenModal}
          isDisabled={isDisabled}
          formId={formId}
        />
      </DetailsWrapper>
        
      <StepsToFollow>
        <ChangePasswordStepsToFollow />
      </StepsToFollow>
        
      
      
      <Suspense>
        <Modal key='profilePageModal' ref={dialogRef}>          
          <ConfirmationModal
            handleClose={handleCloseModal}
            formId={formId}
            text='¿Seguro que desea cambiar la contraseña?'
          />          
        </Modal>
      </Suspense>
    </Suspense>

  )
}