import { useEffect, useRef, useState } from "react"
import { LocationName } from "@/modules/location/locations/domain/LocationName"
import { Subnet } from "@/modules/location/locations/domain/Subnet"
import { TypeOfSiteId } from "@/modules/location/typeofsites/domain/typeOfSiteId"
import { type DefaultLocationProps, type FormLocationDisabled, type FormLocationErrors, type FormLocationRequired } from "@/sections/Hooks/locations/DefaulLocationtInitialState"


export function useErrorLocationManagement({
    typeOfSiteId,
    regionId,
    stateId,
    cityId,
    siteId,
    siteName,
    subnet,
    codeAgency
}: DefaultLocationProps) {
    const isFirstSiteNameInput = useRef(true)
    const isFirstSubnetInput = useRef(true)
    const [error, setError] = useState<FormLocationErrors>({
        typeOfSiteId: '',
        regionId: '',
        stateId: '',
        cityId: '',
        siteId: '',
        siteName: '',
        name: '',
        subnet: '',
    })
    const [disabled, setDisabled] = useState<FormLocationDisabled>({
        typeOfSiteId: false,
        regionId: false,
        stateId: false,
        cityId: false,
        siteId: false,
        siteName: false,
        name: false,
        subnet: false,
    })

    const [required, setRequired] = useState<FormLocationRequired>({
        typeOfSiteId: true,
        regionId: true,
        stateId: true,
        cityId: true,
        siteId: true,
        name: true,
        siteName: true,
        subnet: false,
    })

    useEffect(() => {
        if (isFirstSiteNameInput.current || siteName === '') {
            isFirstSiteNameInput.current = siteName.length < LocationName.NAME_MIN_LENGTH
        }
        if (isFirstSubnetInput.current || subnet === '') {
            isFirstSubnetInput.current = subnet.length < 3
        }
        setError(prev => ({
            ...prev,
            siteName: isFirstSiteNameInput.current ? '' : LocationName.isValid(siteName) ? '' : LocationName.invalidMessage(),
            subnet: isFirstSubnetInput.current ? '' : Subnet.isValid(subnet) ? '' : Subnet.invalidMessage(),
            codeAgency: (codeAgency > 599 || codeAgency < 1) ? 'El valor debe estar entre 1 y 599' : ''
        }))
        setDisabled(prev => ({
            ...prev,
            stateId: !regionId,
            cityId: !stateId,
            siteId: !cityId,
            siteName: !siteId,
            name: !siteId,
            subnet: [TypeOfSiteId.SitesOptions.ALMACEN].includes(typeOfSiteId)
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [cityId, codeAgency, regionId, siteId, siteName, stateId, subnet, typeOfSiteId])

    return {
        error,
        required,
        disabled
    }
}