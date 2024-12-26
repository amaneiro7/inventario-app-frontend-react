import { useEffect, useRef, useState } from "react";
import { type DefaultSiteProps, type FormSiteDisabled, type FormSiteErrors, type FormSiteRequired } from "@/sections/Hooks/locations/site/DefaultSiteInitialState";
import { SiteName } from "@/modules/location/site/domain/SiteName";
import { SiteAddress } from "@/modules/location/site/domain/SiteAddress";

export function useErrorSiteManagement({ name, address }: DefaultSiteProps) {
    const isFirstSiteNameInput = useRef(true)
    const isFirstSiteAddressInput = useRef(true)
    const [error, setError] = useState<FormSiteErrors>({
        name: '',
        address: '',
        cityId: ''
    })
    const [disabled, setDisabled] = useState<FormSiteDisabled>({
        name: false,
        address: false,
        cityId: false
    })

    const [required, setRequired] = useState<FormSiteRequired>({
        name: true,
        address: true,
        cityId: true,
    })

    useEffect(() => {
        if (isFirstSiteNameInput.current || name === '') {
            isFirstSiteNameInput.current = name.length < SiteName.NAME_MIN_LENGTH
        }
        if (isFirstSiteAddressInput.current || address === '') {
            isFirstSiteAddressInput.current = name.length < SiteAddress.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            name: isFirstSiteNameInput.current ? '' : SiteName.isValid(name) ? '' : SiteName.invalidMessage(),
            address: isFirstSiteAddressInput.current ? '' : SiteAddress.isValid(name) ? '' : SiteAddress.invalidMessage()
        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [address, name])

    return {
        error,
        required,
        disabled
    }
}