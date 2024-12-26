import { useState } from 'react'
import { DeviceDownload } from '@/modules/devices/devices/devices/application/DeviceDownload'
import { ApiDeviceRepository } from '@/modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { type SearchByCriteriaQuery } from '@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export function useDownloadExcelFromServer({ query }: { query: SearchByCriteriaQuery }) {
    const [isDownloading, setIsDownloading] = useState(false)
    const download = async () => {
        setIsDownloading(true)
        try {
            await new DeviceDownload(new ApiDeviceRepository()).exec(query)
        } catch (error) {
            console.error(error)
        } finally {
            setIsDownloading(false)
        }
    }

    return { isDownloading, download }
}
