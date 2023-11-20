import { Application } from '../declarations'
import { LockDevice } from '../hooks/payments/lock'
import syncData from '../hooks/sync/sync'
import { logger } from '../logger'

const schedule = require('node-schedule')

export const routineSycnData = (app: Application) => {
  //run every 5 mins
  const job = schedule.scheduleJob('*/1 * * * *', async function () {
    console.log('LASTCONNECTEDAT SYNC:RUNNING')
    const lockClass = new LockDevice(app)
    const devices = await lockClass.fetchDevices({ $limit: 10 })
    if (devices.total) logger.info('DEVICE LOCKED FOUND')
    if (!devices.total) return
    // FETCH NUOVO DEVICES
    devices.data.forEach((device) => {
      syncData.routineSycn(app, device)
    })
  })
}
