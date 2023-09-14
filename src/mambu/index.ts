import { customAxios } from '../utils/axios'
import { Imambu } from './index.dt'
import { logger } from '../logger'

export default class Mambu implements Imambu {
  constructor() {}

  async getClient(clientID: string): Promise<any> {
    try {
      const response = await customAxios().get(`/clients/${clientID}`, {
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

  async getLoan(loanID: string, version: string = 'application/vnd.mambu.v2+json'): Promise<any> {
    try {
      const response = await customAxios().get(`/loans/${loanID}`, {
        params: {
          detailsLevel: 'FULL'
        },
        headers: {
          Accept: version
        }
      })
      return response.data
    } catch (error) {
      logger.log('error', error)
      return null
    }
  }

  async getLoanInstallment(loanID: string): Promise<any> {
    try {
      const response = await customAxios().get(`/loans/${loanID}/schedule`, {
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
      const response = await customAxios().get(`/users/${userId}`, {
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

  async getRole(roleId: string) {
    try {
      const response = await customAxios().get(`/userroles/${roleId}`, {
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
}
