import { API_URL } from '@/modules/shared/infraestructure/config'
import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'

export class ApiDeviceRepository implements DeviceRepository {
  private readonly url: string = 'devices'
  async save({ device }: { device: Device }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: device.toPrimitives() })
  }

  async update({ id, device }: { id: DeviceId, device: Device }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: device.toPrimitives() })
  }

  async getByCriteria(criteria: Criteria): Promise<{ total: number, data: DevicePrimitives[] }> {
    const criteriaPrimitives = criteria.toPrimitives()
    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest<{ total: number, data: DevicesApiResponse[] }>({ method: 'GET', url: `${this.url}?${queryParams}` })
  }

  async download(criteria: Criteria): Promise<void> {
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    const criteriaPrimitives = criteria.toPrimitives()
    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await fetch(`http://${API_URL}devices/download?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnc.ms-excel'
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          return res.blob() // convert the response to a blob
        }
        throw new Error('Network response was not ok')
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error)
      })
  }

  async getAll(): Promise<DevicePrimitives[]> {
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', url: this.url })
  }

  async getById({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
    return await makeRequest<DevicesApiResponse>({ method: 'GET', url: `${this.url}/${id.value}` })
  }
}
