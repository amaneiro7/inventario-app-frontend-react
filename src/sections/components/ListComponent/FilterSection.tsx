import React, { lazy } from 'react'

const HeaderInput = lazy(() => import('../HeaderInput').then(m => ({ default: m.HeaderInput })))

export function FilterSection({ children }: React.PropsWithChildren) {
    return (      
      <HeaderInput>        
        {children}
      </HeaderInput>      
    )

}