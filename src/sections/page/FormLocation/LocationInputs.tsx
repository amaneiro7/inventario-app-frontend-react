import { lazy, Suspense } from "react"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { TypeOfSiteId } from "@/modules/location/typeofsites/domain/typeOfSiteId"
import { type OnHandleChange } from "@/modules/shared/domain/types/types"
import { type FormLocationDisabled, type FormLocationErrors, type FormLocationRequired, type DefaultLocationProps } from "@/sections/Hooks/locations/DefaulLocationtInitialState"

interface Props {
  isAddForm: boolean
  formData: DefaultLocationProps
  error: FormLocationErrors
  disabled: FormLocationDisabled
  required: FormLocationRequired
  onChange: OnHandleChange
  handleSite?: (value: string, siteName: string) => void
}

const TypeOfSiteComboBox = lazy(async () => import('@/sections/components/combo_box/TypeOfSiteComboBox').then(m => ({ default: m.TypeOfSiteComboBox })))
const SiteComboBox = lazy(async () => import('@/sections/components/combo_box/location/SiteComboBox').then(m => ({ default: m.SiteComboBox })))
const RegionComboBox = lazy(async () => import('@/sections/components/combo_box/location/RegionComboBox').then(m => ({ default: m.RegionComboBox })))
const StateComboBox = lazy(async () => import('@/sections/components/combo_box/location/StateComboBox').then(m => ({ default: m.StateComboBox })))
const CityComboBox = lazy(async () => import('@/sections/components/combo_box/location/CityComboBox').then(m => ({ default: m.CityComboBox })))
const SubnetInput = lazy(async () => import('@/sections/components/text-inputs/location/SubnetInput').then(m => ({ default: m.SubnetInput })))
const LocationNameInput = lazy(async () => import('@/sections/components/text-inputs/location/LocationNameInput').then(m => ({ default: m.LocationNameInput })))
const CodeAgencyInput = lazy(async () => import('@/sections/components/number-inputs/CodeAgency').then(m => ({ default: m.CodeAgencyInput })))

export function LocationInputs({ onChange, handleSite, formData, isAddForm, disabled, error, required }: Props) {
  return (
    <>
      <Suspense fallback={<InputSkeletonLoading />}>
        <TypeOfSiteComboBox
          isAddForm={isAddForm}
          onChange={onChange}
          value={formData.typeOfSiteId}
          type='form'
        />
      </Suspense>
      <div className='flex gap-4'>
        <Suspense fallback={<InputSkeletonLoading />}>
          <RegionComboBox
            isAddForm={isAddForm}
            onChange={onChange}
            type='form'
            disabled={disabled.regionId}
            required={required.regionId}
            error={error.regionId}
            value={formData.regionId}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <StateComboBox
            isAddForm={isAddForm}
            onChange={onChange}
            type='form'
            value={formData.stateId}
            region={formData.regionId}
            disabled={disabled.stateId}
            required={required.stateId}
            error={error.stateId}
          />
        </Suspense>
      </div>
      <div className='flex gap-4'>
        <Suspense fallback={<InputSkeletonLoading />}>
          <CityComboBox
            isAddForm={isAddForm}
            onChange={onChange}
            type='form'
            value={formData.cityId}
            state={formData.stateId}
            disabled={disabled.cityId}
            required={required.cityId}
            error={error.cityId}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <SiteComboBox
            isAddForm={isAddForm}
            handleSite={handleSite}
            type='form'
            value={formData.siteId}
            city={formData.cityId}
            disabled={disabled.siteId}
            required={required.siteId}
            error={error.siteId}
          />
        </Suspense>
      </div>
      <div className='flex gap-4'>
        {(isAddForm && formData.typeOfSiteId === TypeOfSiteId.SitesOptions.AGENCY) ?
          <Suspense>
            <CodeAgencyInput
              onChange={onChange}
              value={formData.codeAgency}
              disabled={disabled.codeAgency}
              error={error.codeAgency}
              required={required.codeAgency}
            />
          </Suspense>
          : null}
        <Suspense fallback={<InputSkeletonLoading />}>
          <LocationNameInput
            onChange={onChange}
            value={formData.name}
            siteName={formData.siteName}
            type='form'
            isAddForm={isAddForm}
            disabled={disabled.name}
            required={required.name}
            error={error.name}
          />
        </Suspense>
      </div>

      <Suspense fallback={<InputSkeletonLoading />}>
        <SubnetInput
          onChange={onChange}
          value={formData.subnet}
          disabled={disabled.subnet}
          required={required.subnet}
          error={error.subnet}
        />
      </Suspense>
    </>
  )
}