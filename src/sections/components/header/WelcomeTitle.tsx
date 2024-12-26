import { memo } from "react";
import { type UserApiResponsePrimitives } from "../../../modules/shared/domain/types/responseTypes";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  user: UserApiResponsePrimitives;
}

export const WelcomeTitle = memo(({ user, ...props }: Props) => {
  return (
    <>
      <p {...props} className='flex flex-col text-white'>
        <span>Bienvenido, </span>
        <span>{`${user?.name} ${user?.lastName}`}</span>
      </p>
    </>
  )
})