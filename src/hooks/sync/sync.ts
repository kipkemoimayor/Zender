import { GeneralError } from '@feathersjs/errors'
import { Device, DeviceData } from '../../client'
import { logger } from '../../logger'
import Mambu from '../../mambu'
import { Sync } from './sync.dt'
import { NuovoApi } from '../../nuovo/api'
import util from '../../utils'

const syncData: Sync = {
  isSynced(device: Device) {
    return (
      device.mambuSynced == true &&
      device.mambuSynced == true &&
      device.lockDateSynced == true &&
      new Date(device.nextLockDate).valueOf() > new Date().valueOf()
    )
  },
  isFullSynced() {
    return false
  },
  getPendingDevices(app) {
    return app.service('device').find({
      query: {
        $or: [
          { nuovoSynced: null as any },
          { mambuSynced: null as any },
          { lockDateSynced: false }
          // {
          //   nextLockDate: {
          //     $lt: util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          //   }
          // }
        ],
        $limit: 1,
        locked: false
      }
    })
  },
  async processMambuSync(app, devi) {
    if (!devi.nuovoDeviceId || devi.nuovoSynced) {
      return
    }
    const device = await new NuovoApi().getDevice(devi.nuovoDeviceId)

    if (!device) {
      return
    }
    const client = await app.service('client').get(devi.clientId)

    if (!client) {
      return
    }

    // get mambu installments

    const installments = await new Mambu().getLoanInstallment(devi.loan.accountId)

    const installment = installments.installments.filter(
      (installment) =>
        installment.state === 'PENDING' ||
        installment.state === 'LATE' ||
        installment.state == 'PARTIALLY_PAID'
    )[0]

    const clientNames = client.fullName.split(' ')
    const customerData = {
      device: {
        first_lock_date: installment.dueDate,
        user: {
          first_name: clientNames[0],
          last_name: clientNames[1],
          phone: client.phoneNumber,
          // email: 'test@gmail.com',
          // address: 'Pune',
          country: 'KE'
        },
        device_custom_fields: [
          {
            user_custom_field_id: 645,
            value: client.idNumber
          }
        ]
      }
    }

    await new NuovoApi()
      .updateCustomer(device.device_info.id, customerData)
      .then(() => {
        logger.info('DEVICE DATA SYNCED SUCCESSFULLY:NUOVO')

        new NuovoApi()
          .scheduleDeviceLock([device.device_info.id], installment.dueDate)
          .then(() => {
            // update local device
            app
              .service('device')
              ._patch(devi.id, {
                lockDateSynced: true,
                scheduleNumber: +installment.number,
                initialLockDate: new Date(installment.dueDate),
                nextLockDate: new Date(installment.dueDate)
              })
              .catch((error) => {
                logger.error(
                  JSON.stringify({
                    level: 'error',
                    message: 'FAILED TO UPDATED DEVICE LOCK DATES',
                    data: error
                  })
                )
              })
          })
          .catch((error) => {
            console.log(error)
          })
        app.service('device').patch(devi.id, { nuovoSynced: true, nuovoSyncedAt: new Date() })
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

  async proccessNuovoSync(app, device, deviceId, loanAccountId) {
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
          value: device.status == 'registered' || device.status == 'enrolled' ? 'Enrolled' : 'Unregistered'
        },
        {
          customFieldID: 'CN_010', // Customer Name
          value: device.customer_name || 'Not Recorded'
        },
        {
          customFieldID: 'DN_013', // Device Name
          value: device.name || 'Not Recorded'
        },
        {
          customFieldID: 'lastconnectat', // Device Name
          value: util.formatDate(new Date(device.last_connected_at), 'yyyy-MM-dd')
        }
      ]
    }
    new Mambu().updateLoan(loanAccountId, pathData).then(() => {
      logger.info('DEVICE DATA SYNCED SUCCESSFULLY:MAMBU')
      app.service('device').patch(deviceId, { mambuSynced: true, mambuSyncedAt: new Date() })
    })
  },

  syncMambuData(app, device) {
    if (device.nuovoSynced && device.lockDateSynced) {
      return
    }
    // fetch loan from mambu
    new Mambu()
      .getLoan(device.loan.accountId)
      .then((response) => {
        if (response['_EP'] && response['_EP'].PIN_06) {
          syncData.processMambuSync(app, device)
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

    if (device.mambuSynced) {
      return
    }
    new NuovoApi().getDevice(device.nuovoDeviceId).then((response) => {
      if (!response.device_info.customer_name) {
        return
      }

      syncData.proccessNuovoSync(app, response.device_info, device.id, device.loan.accountId)
    })
  },
  async getFailedDevices(app) {
    const devices = await app.service('device').find({
      paginate: false
    })

    const devicesId = devices.map((device: Device) => device.loanId)

    return app.service('loan').find({
      query: {
        id: {
          $nin: devicesId
        },
        retry: {
          $lte: 3
        }
      }
    })
  },
  searchAndCreateDevice(app, loan) {
    new Mambu()
      .getLoan(loan.accountId)
      .then((response) => {
        // if
        if (response['_EP'] && response['_EP'].PIN_06) {
          // search nuovo
          new NuovoApi()
            .getAllDevices(response['_EP'].PIN_06)
            .then((devices) => {
              const clientDevice = devices.devices.filter(
                (device) =>
                  device.imei_no === response['_EP'].PIN_06 || device.imei_no2 === response['_EP'].PIN_06
              )[0]

              if (!clientDevice) {
                logger.info('FAILED CREATING DEVICE-NO DEVICE FOUND IN NUOVO:API')
                app.service('loan').patch(loan.id, { retry: (loan.retry || 0) + 1 })
                return
              }
              // create device
              const deviceData: DeviceData = {
                imei: clientDevice.imei_no,
                loanId: loan.id,
                status: clientDevice.is_activated ? 'ACTIVE' : 'PENDING',
                serialNo: clientDevice.serial_no,
                make: clientDevice.make,
                model: clientDevice.model,
                locked: clientDevice.locked,
                clientId: loan.clientId,
                nuovoDeviceId: clientDevice.id
              }

              // create
              app
                .service('device')
                .create(deviceData)
                .then(async () => {
                  logger.info('DEVICE CREATED SUCCESSFULLY:API')
                })
                .catch(() => {
                  logger.info('FAILED CREATING DEVICE:API')
                  app.service('loan').patch(loan.id, { retry: (loan.retry || 0) + 1 })
                })
            })
            .catch((error) => {
              // update loan failed
              app.service('loan').patch(loan.id, { retry: (loan.retry || 0) + 1 })
              if (error.response) {
                const errorLog = JSON.stringify({
                  level: 'error',
                  data: { ...error.response },
                  message: 'FAILED TO GET DEVICE DETAILS:NUOVO'
                })
                logger.error(errorLog)
                throw new GeneralError(error)
              }
            })
        }
      })
      .catch((error) => {
        app.service('loan').patch(loan.id, { retry: (loan.retry || 0) + 1 })
        if (error.response) {
          const errorLog = JSON.stringify({
            level: 'error',
            data: { ...error.response },
            message: error.message
          })
          logger.error(errorLog)
          throw new GeneralError(error)
        }
      })
  },
  async syncLockDates(app, device) {
    if (device.lockDateSynced || !device.nuovoDeviceId) {
      return
    }
    // get mambu installments

    const installments = await new Mambu().getLoanInstallment(device.loan.accountId)

    const installment = installments.installments.filter(
      (installment) =>
        installment.state === 'PENDING' ||
        installment.state === 'LATE' ||
        installment.state == 'PARTIALLY_PAID'
    )[0]

    new NuovoApi()
      .scheduleDeviceLock([device.nuovoDeviceId], installment.dueDate)
      .then(() => {
        // update local device
        app
          .service('device')
          ._patch(device.id, {
            lockDateSynced: true,
            initialLockDate: new Date(installment.dueDate),
            nextLockDate: new Date(installment.dueDate)
          })
          .catch((error) => {
            logger.error(
              JSON.stringify({
                level: 'error',
                message: 'FAILED TO UPDATED DEVICE LOCK DATES',
                data: error
              })
            )
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default syncData
