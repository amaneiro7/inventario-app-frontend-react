import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type ModelApiresponse } from '../../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ModelPrimitives, type Model } from '../domain/Model'
import { type ModelId } from '../domain/ModelId'
import { type ModelRepository } from '../domain/ModelRepository'

export class ApiModelRepository implements ModelRepository {
  private readonly url: string = 'models'
  async save({ model }: { model: Model }): Promise<void> {
    return await makeRequest({ method: 'POST', url: this.url, data: model.toPrimitives() })
  }

  async update({ id, model }: { id: ModelId, model: Model }): Promise<void> {
    return await makeRequest({ method: 'PATCH', url: `${this.url}/${id.value}`, data: model.toPrimitives() })
  }

  async getAll(): Promise<ModelPrimitives[]> {
    return await makeRequest<ModelApiresponse[]>({ method: 'GET', url: `${this.url}/all` })
  }

  async getByCriteria(criteria: Criteria): Promise<{ total: number; data: ModelPrimitives[] }> {
    const criteriaPrimitives = criteria.toPrimitives()

    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest({ method: 'GET', url: `${this.url}?${queryParams}` })
  }

  async getById({ id }: { id: ModelId }): Promise<ModelPrimitives | null> {
    return await makeRequest({ method: 'GET', url: `${this.url}/${id.value}` })
  }

  async download(criteria: Criteria): Promise<void> {
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    const criteriaPrimitives = criteria.toPrimitives()
    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await fetch(`http://localhost:5000/api/v1/models/download?${queryParams}`, {
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

}
