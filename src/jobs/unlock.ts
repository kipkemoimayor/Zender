import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import { LockDevice } from '../hooks/payments/lock'
import reminder from '../hooks/payments/reminder'
import { logger } from '../logger'

const ulockSchedule = require('node-schedule')

export const unlockJob = (app: Application) => {
  //RUNS EVERY TWO MINS
  ulockSchedule.scheduleJob('*/2 * * * *', async function () {
    console.log('UN:LOCK SCHEDULER RUNNNING')
    try {
      const lockClass = new LockDevice(app)
      const duerClass = new DueReminder(app)

      let devices = await lockClass.fetchLockedDevices()

      if (!devices.length) {
        return
      } else {
        logger.info('DEVICE UNLOCKED FOUND')
        console.log('---------------')
        console.log(devices.length)
      }

      // check repaymentt
      const endDay = new Date()

      for (let device of devices) {
        duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
          if (response.nextLockDate) {
            console.log('HERE=========================')
            console.log(device)
            console.log('HERE=========================')
            //update loan
            reminder.updateLoan(app, device.loan, {
              mambuSyncedAt: endDay,
              mambuSynced: true,
              daysToNextInstallment: Math.floor(
                new Date(response.nextLockDate).valueOf() / (1000 * 60 * 60 * 24)
              )
            })

            // update lock schedule
            duerClass.setLockDate(app, device, response, false)

            // record history
            app.service('device-lock-history').create({
              deviceId: device.id,
              reason: 'REPAYMENT',
              loanId: device.loan.id,
              type: 2,
              unlockedAt: new Date()
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
}
