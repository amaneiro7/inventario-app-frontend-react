import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'
import { API_URL, isDev } from './config'

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function makeRequest<T>(config: AxiosRequestConfig & {
  _retry?: boolean
}): Promise<T> {
  try {
    const response = await api(config)
    if (!response.data) {
      throw new Error('Ha ocurrido un error inesperado')
    }
    return response.data as T
  } catch (error) {
    if (isDev) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data || 'Error desconocido')
      } else if (error instanceof Error) {
        throw new Error('No se ha podido realizar la petición')
      } else {
        throw new Error('No se ha podido realizar la petición')
      }
    }
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response
      if (status === 401) {
        throw new Error('No autorizado')
      }
      if (status === 403) {
        throw new Error('Acceso Denegado')
      }
      if (status === 404) {
        throw new Error('No encontrado')
      }
      if (status === 500) {
        throw new Error('Error interno del servidor')
      }

      throw new Error(error.response.data || 'Error desconocido')
    }
    throw new Error('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde')

  }
}