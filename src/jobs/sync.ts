import { Application } from '../declarations'
import syncData from '../hooks/sync/sync'

const schedule = require('node-schedule')

export const syncJob = (app: Application) => {
  const job = schedule.scheduleJob('*/1 * * * *', async function () {
    console.log('The answer to life, the universe, and everything!')

    //check for failed device creation
    const failedDevices = await syncData.getFailedDevices(app)
    // end of failed

    if (failedDevices.data.length) {
      failedDevices.data.forEach((loan) => {
        setTimeout(() => {
          syncData.searchAndCreateDevice(app, loan)
        }, 1000)
      })
    }

    const devices = await syncData.getPendingDevices(app)

    if (devices.total == 0) {
      return
    }

    //
    const deviceSynced = syncData.isSynced(devices.data[0])

    if (deviceSynced) {
      return
    }

    // sync data

    // Mambu-nuovo sync
    syncData.syncMambuData(app, devices.data[0])
    // Nuovo-mambu sync
    syncData.syncNuovoData(app, devices.data[0])
  })
}
