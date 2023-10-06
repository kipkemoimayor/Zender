import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import { LockDevice } from '../hooks/payments/lock'
import reminder from '../hooks/payments/reminder'
import { logger } from '../logger'

const schedule = require('node-schedule')

export const unlockJob = (app: Application) => {
  const job = schedule.scheduleJob('*/6 * * * *', async function () {
    console.log('un:Lock scheduler running')
    try {
      const lockClass = new LockDevice(app)
      const duerClass = new DueReminder(app)

      const devices = await lockClass.fetchLockedDevices()

      if (!devices.length) return

      // check repaymentt

      const endDay = new Date()
      endDay.setMilliseconds(0)
      endDay.setMinutes(59)
      endDay.setHours(23)
      endDay.setSeconds(59)

      devices.forEach((device) => {
        duerClass.loanPaid(device.loan.accountId).then((response) => {
          if (response.days > 1) {
            //update loan
            lockClass
              .unlockDevice([device.nuovoDeviceId])
              .then((nuovoRes) => {
                logger.info('DEVICE UNLOCKED SUCCESSFULLY')
                reminder.updateLoan(app, device.loan, {
                  mambuSyncedAt: endDay,
                  mambuSynced: true,
                  daysRemaining: response.days,
                  paid: response.paid,
                  daysToNextInstallment: response.daysToNextInstallment,
                  paidOff: response.paidOff
                })

                lockClass.updateOneDevice(device.id, {
                  locked: false,
                  lockReady: false,
                  lockReadyScheduleAt: null
                })

                // create lock history
                lockClass.saveLockHistory({
                  type: 2,
                  unlockedAt: new Date(),
                  reason: 'LOAN REPAID',
                  loanId: device.loanId,
                  deviceId: device.id
                })
              })
              .catch((error: any) => {
                if (error.response) {
                  const errorLog = JSON.stringify({
                    level: 'error',
                    data: { ...error.response.data },
                    message: 'FAILED TO UNLOCK NUOVO DEVICE'
                  })
                  logger.log('error', errorLog)
                }
              })
          }
        })
      })
      console.log(devices)
    } catch (error) {
      console.log(error)
    }
  })
}
