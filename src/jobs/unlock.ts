import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import { LockDevice } from '../hooks/payments/lock'
import reminder from '../hooks/payments/reminder'
import { logger } from '../logger'

const schedule = require('node-schedule')

export const unlockJob = (app: Application) => {
  //RUNS EVERY TWO MINS
  const job = schedule.scheduleJob('*/2 * * * *', async function () {
    console.log('UN:LOCK SCHEDULER RUNNNING')
    try {
      const lockClass = new LockDevice(app)
      const duerClass = new DueReminder(app)

      let devices = await lockClass.fetchLockedDevices()

      if (!devices.length) return

      // check repaymentt
      const endDay = new Date()
      endDay.setMilliseconds(0)
      endDay.setMinutes(59)
      endDay.setHours(23)
      endDay.setSeconds(59)

      devices.forEach((device) => {
        duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
          console.log('HERE=========================')
          console.log('HERE=========================')

          if (response.nextLockDate) {
            //update loan
            reminder.updateLoan(app, device.loan, {
              mambuSyncedAt: endDay,
              mambuSynced: true,
              daysToNextInstallment: Math.floor(
                new Date(response.nextLockDate).valueOf() / (1000 * 60 * 60 * 24)
              )
            })

            // update lock schedule
            duerClass.setLockDate(app, device, response)

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
      })
    } catch (error) {
      console.log(error)
    }
  })
}
