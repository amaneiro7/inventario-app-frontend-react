import { lazy, memo, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { AppContextProvider } from "../Context/AppProvider"

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })))
const Footer = lazy(async () => await import("./Footer"))
const Main = lazy(async () => await import("./Main"))

function Layout () {
    return (
      <AppContextProvider>
        <Header />        
        <Main>
          <Outlet />
        </Main>        
        <Suspense fallback={<footer className='min-h-8 h-8 bg-slate-700' />}>
          <Footer />
        </Suspense>
      </AppContextProvider>
    )
  }

export default memo(Layout)