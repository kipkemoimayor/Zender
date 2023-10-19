import { Application } from '../declarations'
import syncData from '../hooks/sync/sync'
import util from '../utils'

const schedule = require('node-schedule')

export const syncJob = (app: Application) => {
  const job = schedule.scheduleJob('*/2 * * * *', async function () {
    console.log('SYNC SCHEDULER:RUNNING!')

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

    console.log(devices)

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

    // sleep
    await util.sleep(2000)
    syncData.syncLockDates(app, devices.data[0])
  })
}
