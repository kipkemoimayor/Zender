import { Application } from '../declarations'
import { LockDevice } from '../hooks/payments/lock'
import { logger } from '../logger'
import { NuovoApi } from '../nuovo/api'

const schedule = require('node-schedule')

export const lockJob = (app: Application) => {
  //run every 5 mins
  const job = schedule.scheduleJob('*/14 * * * *', async function () {
    console.log('LOCK SCHEDULER:RUNNING')
    try {
      const lockClass = new LockDevice(app)
      const devices = await lockClass.fetchAllPendingLocks()
      logger.info('DEVICE LOCKED FOUND')
      if (!devices.length) return
      // FETCH NUOVO DEVICES
      devices.forEach((device) => {
        new NuovoApi().getDevice(device.nuovoDeviceId).then((response) => {
          const nvDevice = response.device_info
          lockClass.updateOneDevice(device.id, {
            locked: nvDevice.locked,
            lastConnectedAt: new Date(nvDevice.last_connected_at)
          })

          // record history
          app.service('device-lock-history').create({
            deviceId: device.id,
            reason: 'NO PAYMENT RECIEVED',
            loanId: device.loan.id,
            type: 1,
            lockedAt: new Date()
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}
