import { lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { useLocationContext } from "@/sections/Context/LocationProvider"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { SpinnerSKCircle } from "@/sections/components/Loading/spinner-sk-circle"
import { type LocationApiResponse } from "@/modules/shared/domain/types/responseTypes"

const DetailsWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsBoxWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsBoxWrapper"))
const InfoBox = lazy(async () => import("@/sections/components/info-box/InfoBox").then(m => ({ default: m.InfoBox })))
const InfoBoxTitle = lazy(async () => import("@/sections/components/info-box/InfoBoxTitle").then(m => ({ default: m.InfoBoxTitle })))
const InfoBoxText = lazy(async () => import("@/sections/components/info-box/InfoBoxText").then(m => ({ default: m.InfoBoxText })))
const TypeOfSiteComboBox = lazy(async () => import("@/sections/components/combo_box/TypeOfSiteComboBox").then(m => ({ default: m.TypeOfSiteComboBox })))
const LocationNameInput = lazy(async () => import("@/sections/components/text-inputs/location/LocationNameInput").then(m => ({ default: m.LocationNameInput })))
const Button = lazy(async () => import("@/sections/components/button/button"))
const StateComboBox = lazy(async () => import("@/sections/components/combo_box/location/StateComboBox").then(m => ({ default: m.StateComboBox })))
const RegionComboBox = lazy(async () => import("@/sections/components/combo_box/location/RegionComboBox").then(m => ({ default: m.RegionComboBox })))
const CityComboBox = lazy(async () => import("@/sections/components/combo_box/location/CityComboBox").then(m => ({ default: m.CityComboBox })))
const HeaderInput = lazy(async () => import('@/sections/components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('@/sections/components/Main'))
const PageTitle = lazy(async () => import('@/sections/components/Typography/PageTitle'))
const AddIcon = lazy(() => import("@/sections/components/icon/AddIcon").then((m) => ({ default: m.AddIcon })))

export default function ListadoSitios() {
  const navigate = useNavigate()
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { locations, loading, addFilter, cleanFilters } = useLocationContext()
  const { handleChange, handleClear, inputData } = useInputsData({ addFilter, cleanFilters, initialInputData, defaultInputData })

  return (
    <Suspense>
      <Main content='max' overflow={false} className='pr-8'>
        <PageTitle title='Listado de Sitios' />
        <DetailsWrapper borderColor='blue'>
          <DetailsBoxWrapper>
            <HeaderInput>
              <Suspense fallback={<InputSkeletonLoading />}>
                <LocationNameInput type='search' onChange={handleChange} value={inputData.name} />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <RegionComboBox onChange={handleChange} value={inputData.regionId} />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <StateComboBox onChange={handleChange} value={inputData.stateId} region={inputData.regionId} />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <CityComboBox onChange={handleChange} value={inputData.cityId} state={inputData.stateId} region={inputData.regionId} />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <TypeOfSiteComboBox onChange={handleChange} value={inputData.typeOfSiteId} />
              </Suspense>
            </HeaderInput>
            <section className='my-4 min-h-11 flex gap-2'>
              <Suspense fallback={<InputSkeletonLoading />}>
                <Button
                  type='button'
                  text='Añadir'
                  color='orange'
                  buttonSize='medium'
                  size='content'
                  onClick={() => { navigate('/location/add') }}
                  icon={
                    <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                      <AddIcon width={20} fill='white' className='aspect-square' />
                    </Suspense>
                  }
                />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <Button
                  color='secondary'
                  buttonSize='medium'
                  size='content'
                  type='button'
                  text='Limpiar'
                  onClick={handleClear}
                />
              </Suspense>
            </section>
          </DetailsBoxWrapper>
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))',
            gap: '2rem',
          }}
          >
            {loading && <SpinnerSKCircle />}
            {(!loading && locations.length === 0) && <p>No hay resultados</p>}
            {(!loading && locations.length > 0) &&
              (locations as LocationApiResponse[]).map((location) => (
                <Suspense key={location?.id}>
                  <InfoBox key={location?.id}>
                    <InfoBoxTitle title={location?.name} state={location} url={`/location/edit/${location?.id}`} />
                    <InfoBoxText desc='Tipo' text={location?.typeOfSite?.name} />
                    <InfoBoxText className='flex-1' desc='Dirección' text={location?.site?.address} />
                    <InfoBoxText desc='Estado' text={location?.site?.city?.state?.name} />
                    <InfoBoxText desc='Ciudad' text={location?.site?.city?.name} />
                    <InfoBoxText desc='Subnet' text={location?.subnet} />
                  </InfoBox>
                </Suspense>
              ))}
          </section>
        </DetailsWrapper>
      </Main>

    </Suspense>
  )
}