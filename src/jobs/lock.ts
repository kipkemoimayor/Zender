import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import { LockDevice } from '../hooks/payments/lock'
import reminder from '../hooks/payments/reminder'

const schedule = require('node-schedule')

export const lockJob = (app: Application) => {
  const job = schedule.scheduleJob('*/6 * * * *', async function () {
    console.log('Lock scheduler running')
    try {
      const lockClass = new LockDevice(app)
      const devices = await lockClass.fetchAllPendingLocks()

      if (!devices.length) return

      const nuovoDeviceId = devices.map((device) => device.nuovoDeviceId)
      lockClass.applyLock(nuovoDeviceId, devices, 'lock')
      console.log(devices)
    } catch (error) {
      console.log(error)
    }
  })
}
