import { Axios } from 'axios'
import { logger } from '../logger'
import { customAxios } from '../utils/axios'
import { GeneralError } from '@feathersjs/errors'

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

  async getDevice(deviceId: any): Promise<any> {
    try {
      const response = await this.axios.get(`/devices/${deviceId}.json`)
      return response.data
    } catch (error: any) {
      if (error.response) {
        logger.log('error', error.response)
      }
      //   logger.log('error', error)
      return error
    }
  }

  async updateCustomer(deviceId: string, data: any) {
    try {
      const response = await this.axios.patch(`/devices/${deviceId}.json`, data)
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO UPDATE NUOVO DEVICE'
        })
        logger.log('error', errorLog)
      }
      //   logger.log('error', error)
      throw new GeneralError(error)
    }
  }

  async lockDevice(deviceIds: number[]) {
    try {
      const response = await this.axios.patch(`/devices/lock.json`, {
        device_ids: deviceIds
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO UPDATE NUOVO DEVICE'
        })
        logger.log('error', errorLog)
      }
      //   logger.log('error', error)
      throw new GeneralError(error)
    }
  }

  async unlockDevice(deviceIds: number[]) {
    try {
      const response = await this.axios.patch(`/devices/unlock.json`, {
        device_ids: deviceIds
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO UPDATE NUOVO DEVICE'
        })
        logger.log('error', errorLog)
      }
      //   logger.log('error', error)
      throw new GeneralError(error)
    }
  }
}
