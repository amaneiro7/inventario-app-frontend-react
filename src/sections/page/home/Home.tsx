import { lazy, Suspense } from "react"
import { navigation } from "@/sections/Routes/new.routes"
import Loading from "@/sections/components/Loading"

const Banner = lazy(() => import("@/sections/components/Banner"))
const TilesSection = lazy(() => import("@/sections/components/TilesSection/TilesSection").then((m) => ({ default: m.TilesSection })))
const TilesContainer = lazy(() => import("@/sections/components/TilesSection/TilesContainer").then((m) => ({ default: m.TilesContainer })))
const TilesBox = lazy(() => import("@/sections/components/TilesSection/TilesBox").then((m) => ({ default: m.TilesBox })))
const TilesInvisible = lazy(() => import("@/sections/components/TilesSection/TilesInvisible").then((m) => ({ default: m.TilesInvisible })))
const TilesInvisibleInfo = lazy(() => import("@/sections/components/TilesSection/TilesInvisibleInfo").then((m) => ({ default: m.TilesInvisibleInfo })))
const TilesVisible = lazy(() => import("@/sections/components/TilesSection/TilesVisible").then((m) => ({ default: m.TilesVisible })))


export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Suspense fallback={<section className='relative w-full min-w-full h-52 bg-secondary-900' />}>
        <Banner />
      </Suspense>
            
      <TilesSection>
        <TilesContainer>
          {navigation.map((nav, index) => (
            <TilesBox img={nav.img} key={nav.label}>
              <TilesInvisible>
                {nav.navs.map((info) => (
                  <TilesInvisibleInfo
                    key={info.path}
                    label={info.title}
                    url={info.path}
                  />
                    ))}
              </TilesInvisible>
              <TilesVisible isPar={index} desc={nav.desc} title={nav.label} />
            </TilesBox>
              ))}
        </TilesContainer>
      </TilesSection>
      
      
    </Suspense>
  )
}
