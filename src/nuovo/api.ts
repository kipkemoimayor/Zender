import { Axios } from 'axios'
import { logger } from '../logger'
import { customAxios } from '../utils/axios'

export interface Axconfig {
  baseUrl: string | undefined
  apiKey?: string
}

export class NuovoApi {
  config: Axconfig = {
    baseUrl: process.env.NUOVO_PAY_BASE_URL
  }
  axios: Axios
  constructor() {
    this.axios = customAxios(this.config)
  }

  async getAllDevices() {
    try {
      const response = await this.axios.get(`/devices.json`)
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
