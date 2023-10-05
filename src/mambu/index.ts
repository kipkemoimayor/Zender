import { customAxios } from '../utils/axios'
import { Imambu } from './index.dt'
import { logger } from '../logger'
import { Axconfig } from '../nuovo/api'
import { Axios } from 'axios'
import { GeneralError } from '@feathersjs/errors'

export interface Installment {
  installments: any[]
}
export default class Mambu implements Imambu {
  private config: Axconfig = {
    baseUrl: process.env.mambu_api_url,
    apiKey: process.env.mambu_api_key
  }
  private axios: Axios
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

  async getLoan(loanID: any): Promise<any> {
    try {
      const response = await this.axios.get(`/loans/${loanID}`, {
        params: {
          detailsLevel: 'FULL'
        }
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO FETCH LOAN ACCOUNT:MAMBU'
        })
        logger.log('error', errorLog)
      }
      throw new GeneralError(error)
    }
  }

  async searchLoans(encodedKeys: string[]): Promise<any[]> {
    try {
      const response = await this.axios.post(`/loans:search`, {
        filterCriteria: [
          {
            field: 'encodedKey',
            operator: 'IN',
            values: encodedKeys
          }
        ]
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO SEARCH LOANS:MAMBU'
        })
        logger.log('error', errorLog)
      }
      throw new GeneralError(error)
    }
  }

  async getSchedule(loanAccountId: string): Promise<any[]> {
    try {
      const response = await this.axios.post(`/loans/${loanAccountId}/schedule`)
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO FETCH INSTALLMENT:MAMBU'
        })
        logger.log('error', errorLog)
      }
      throw new GeneralError(error)
    }
  }

  async getLoanInstallment(loanID: string): Promise<Installment> {
    try {
      const response = await this.axios.get(`/loans/${loanID}/schedule`, {
        params: {
          limit: 1
        }
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        const errorLog = JSON.stringify({
          level: 'error',
          data: { ...error.response.data },
          message: 'FAILED TO FETCH INSTALLMENT:MAMBU'
        })
        logger.log('error', errorLog)
      }
      throw new GeneralError(error)
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
