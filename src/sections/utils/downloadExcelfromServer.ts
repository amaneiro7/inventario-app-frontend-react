import { useState } from 'react'
import { DeviceDownload } from '@/modules/devices/devices/devices/application/DeviceDownload'
import { ApiDeviceRepository } from '@/modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { ModelDownload } from '@/modules/devices/model/model/application/ModelDownload'
import { ApiModelRepository } from '@/modules/devices/model/model/infraestructure/ApiModelRepository'
import { type SearchByCriteriaQuery } from '@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type Source } from '@/modules/shared/domain/types/types'

export function useDownloadExcelFromServer({
	query,
	source
}: {
	query: SearchByCriteriaQuery
	source: Source
}) {
	const [isDownloading, setIsDownloading] = useState(false)
	const download = async () => {
		setIsDownloading(true)
		try {
			if (source === 'model') {
				await new ModelDownload(new ApiModelRepository()).exec(
					query,
					source
				)
			} else {
				await new DeviceDownload(new ApiDeviceRepository()).exec(
					query,
					source
				)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsDownloading(false)
		}
	}

	return { isDownloading, download }
}
