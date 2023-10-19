import { Application } from '../declarations'
import { LockDevice } from '../hooks/payments/lock'
import { logger } from '../logger'
import { NuovoApi } from '../nuovo/api'
import util from '../utils'

const schedule = require('node-schedule')

export const lockJob = (app: Application) => {
  //run every 5 mins
  const job = schedule.scheduleJob('*/5 * * * *', async function () {
    console.log('LOCK SCHEDULER:RUNNING')
    try {
      const lockClass = new LockDevice(app)
      const devices = await lockClass.fetchAllPendingLocks()
      if (devices.length) logger.info('DEVICE LOCKED FOUND')
      if (!devices.length) return
      // FETCH NUOVO DEVICES
      devices.forEach((device) => {
        new NuovoApi().getDevice(device.nuovoDeviceId).then((response) => {
          const nvDevice = response.device_info
          const nuvoDate = nvDevice.last_connected_at.split('-')

          const newDate = `${nuvoDate[1]}-${nuvoDate[0]}-${nuvoDate[2]}`

          if (!nvDevice.locked) {
            console.log('========')
            console.log(nvDevice.last_connected_at)
            console.log('========')

            lockClass.lockDevice([nvDevice.id]).then(() => {
              lockClass.updateOneDevice(device.id, {
                locked: true,
                lastConnectedAt: util.addDateTimeZone(newDate)
              })
            })
          } else {
            lockClass.updateOneDevice(device.id, {
              locked: true,
              lastConnectedAt: util.addDateTimeZone(newDate)
            })
          }
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
