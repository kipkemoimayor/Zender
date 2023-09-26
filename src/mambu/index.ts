import { customAxios } from '../utils/axios'
import { Imambu } from './index.dt'
import { logger } from '../logger'
import { Axconfig } from '../nuovo/api'
import { Axios } from 'axios'
import { GeneralError } from '@feathersjs/errors'

export default class Mambu implements Imambu {
  config: Axconfig = {
    baseUrl: process.env.mambu_api_url,
    apiKey: process.env.mambu_api_key
  }
  axios: Axios
  constructor() {
    this.axios = customAxios(this.config)
  }

  async getClient(clientID: string): Promise<any> {
    try {
      const response = await this.axios.get(`/clients/${clientID}`, {
        params: {
          detailsLevel: 'FULL'
        }
      })
      return response.data
    } catch (error) {
      logger.log('error', error)
      return null
    }
  }

  async getLoan(loanID: any, version: string = 'application/vnd.mambu.v2+json'): Promise<any> {
    try {
      const response = await this.axios.get(`/loans/${loanID}`, {
        params: {
          detailsLevel: 'FULL'
        },
        headers: {
          Accept: version
        }
      })
      return response.data
    } catch (error: any) {
      logger.log('error', error.response)
      throw new GeneralError(error)
    }
  }

  async getLoanInstallment(loanID: string): Promise<any> {
    try {
      const response = await this.axios.get(`/loans/${loanID}/schedule`, {
        params: {
          limit: 1
        }
      })
      return response.data
    } catch (error) {
      logger.log('error', error)
      return null
    }
  }

  async getUser(userId: string) {
    try {
      const response = await this.axios.get(`/users/${userId}`, {
        params: {
          detailsLevel: 'FULL'
        }
      })
      return response.data
    } catch (error: any) {
      logger.log('error', error.response)
      throw new GeneralError(error)
    }
  }

  async getRole(roleId: string) {
    try {
      const response = await this.axios.get(`/userroles/${roleId}`, {
        params: {
          detailsLevel: 'FULL'
        }
      })
      return response.data
    } catch (error: any) {
      logger.log('error', error.response)
      throw new GeneralError(error)
    }
  }

  async updateLoan(loanID: string, data: any) {
    try {
      const response = await this.axios.patch(`/loans/${loanID}/custominformation`, data, {
        headers: {
          Accept: 'application/vnd.mambu.v1+json'
        }
      })
      return response.data
    } catch (error: any) {
      logger.log('error', error.response)
      throw new GeneralError(error)
    }
  }
}
