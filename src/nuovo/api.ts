import { Axios } from 'axios'
import { logger } from '../logger'
import { customAxios } from '../utils/axios'

export interface Axconfig {
  baseUrl: string | undefined
  apiKey?: string
}

export interface Query {
  ['fields']: string
}
export class NuovoApi {
  private config: Axconfig = {
    baseUrl: process.env.NUOVO_PAY_BASE_URL,
    apiKey: process.env.NUOVO_PAY_API_KEY
  }
  private axios: Axios
  constructor() {
    this.axios = customAxios(this.config)
  }

  async getAllDevices(query: string): Promise<{ total_count: number; devices: any[] }> {
    try {
      const response = await this.axios.get(`/devices.json`, {
        params: {
          search_string: query
        }
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        logger.log('error', error.response)
      }

      //   logger.log('error', error)
      return error
    }
  }

  async updateCustomer(deviceId: number, data: any) {
    try {
      const response = await this.axios.patch(`/devices/${deviceId}.json`, data)
      return response.data
    } catch (error: any) {
      if (error.response) {
        logger.log('error', error.response)
      }

      //   logger.log('error', error)
      return error
    }
  }
}
