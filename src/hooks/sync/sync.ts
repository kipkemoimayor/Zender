import { GeneralError } from '@feathersjs/errors'
import { Device, DeviceData } from '../../client'
import { logger } from '../../logger'
import Mambu from '../../mambu'
import { Sync } from './sync.dt'
import { NuovoApi } from '../../nuovo/api'

const syncData: Sync = {
  isSynced(device: Device) {
    return device.mambuSynced == true && device.mambuSynced == true
  },
  isFullSynced() {
    return false
  },
  getPendingDevices(app) {
    return app.service('device').find({
      query: {
        $or: [{ nuovoSynced: null }, { mambuSynced: null }],
        $limit: 1
      }
    })
  },
  async processMambuSync(app, nuovodeviceId, clientId, deviceId) {
    if (!nuovodeviceId) {
      return
    }
    const device = await new NuovoApi().getDevice(nuovodeviceId)

    if (!device) {
      return
    }
    const client = await app.service('client').get(clientId)

    if (!client) {
      return
    }

    const clientNames = client.fullName.split(' ')
    const customerData = {
      device: {
        user: {
          first_name: clientNames[0],
          last_name: clientNames[1],
          // phone: '9876543210',
          // email: 'test@gmail.com',
          // address: 'Pune',
          country: 'KE'
        }
      }
    }

    await new NuovoApi()
      .updateCustomer(device.device_info.id, customerData)
      .then(() => {
        logger.info('DEVICE DATA SYNCED SUCCESSFULLY')
        app.service('device').patch(deviceId, { nuovoSynced: true, nuovoSyncedAt: new Date() })
      })
      .catch((error) => {
        if (error.response) {
          const errorLog = JSON.stringify({
            level: 'error',
            data: { ...error.response.data },
            message: 'FAILED TO UPDATE NUOVO DEVICE'
          })
          logger.log('error', errorLog)
        }
      })
  },

  async proccessNuovoSycn(app, device, deviceId, loanAccountId) {
    const pathData = {
      customInformation: [
        {
          customFieldID: 'DD_012', // Device ID
          value: device.id
        },
        {
          customFieldID: 'WC_05', // Whitelisting Of Client
          value: 'Yes'
        },
        {
          customFieldID: 'AL_01', // Approved limit
          value: 20000
        },
        {
          customFieldID: 'DC_02', // doc compliance
          value: 'Yes'
        },
        {
          customFieldID: 'PM_08', // model
          value: device.model || 'Not Recorded'
        },
        {
          customFieldID: 'PIN_06', // IMEI
          value: device.imei_no || 'Not Recorded'
        },
        {
          customFieldID: 'PSN_07', // S.N
          value: device.serial_no || 'Not Recorded'
        },
        {
          customFieldID: 'PS_09', // STATUS
          value: device.status == 'registered' ? 'Enrolled' : 'unregistered'
        },
        {
          customFieldID: 'CN_010', // Customer Name
          value: device.customer_name || 'Not Recorded'
        },
        {
          customFieldID: 'DN_013', // Device Name
          value: device.name || 'Not Recorded'
        }
      ]
    }
    new Mambu().updateLoan(loanAccountId, pathData).then(() => {
      logger.info('DEVICE DATA SYNCED SUCCESSFULLY:MAMBU')
      app.service('device').patch(deviceId, { mambuSynced: true, mambuSyncedAt: new Date() })
    })
  },

  syncMambuData(app, device) {
    if (device.nuovoSynced) {
      return
    }
    // fetch loan from mambu
    new Mambu()
      .getLoan(device.loan.accountId)
      .then((response) => {
        if (response['_EP'] && response['_EP'].PIN_06) {
          syncData.processMambuSync(app, device.nuovoDeviceId || '', device.clientId, device.id)
        } else {
          const infoLog = JSON.stringify({
            level: 'info',
            data: { loanId: response.id },
            message: 'DEVICE:MISSING MAMBU IMEI'
          })
          logger.info(infoLog)
        }
      })
      .catch((error) => {
        const errorLog = JSON.stringify({
          level: 'info',
          data: { ...error.response },
          message: error.message
        })
        logger.error(errorLog)
        throw new GeneralError(error)
      })
  },
  syncNuovoData(app, device) {
    if (!device.nuovoDeviceId) {
      return
    }
    new NuovoApi().getDevice(device.nuovoDeviceId).then((response) => {
      if (!response.device_info.customer_name) {
        return
      }

      syncData.proccessNuovoSycn(app, response.device_info, device.id, device.loan.accountId)
    })
  }
}

export default syncData
