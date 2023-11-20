import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import reminder from '../hooks/payments/reminder'
import util from '../utils'

const schedule = require('node-schedule')

export const reminderJob = (app: Application) => {
  const job = schedule.scheduleJob('*/4 * * * *', async function () {
    console.log('REMINDER SCHEDULER:RUNNING')
    try {
      const duerClass = new DueReminder(app)

      const reminderDevices = await duerClass.getDeviceDueInOneDay()

      console.log('========================')
      console.log(reminderDevices.length)
      console.log('========================')

      //filter out already sent reminders

      const devicesDue = reminderDevices.filter((device) => {
        if (device.reminderSet) {
          if (
            util.formatDate(new Date(device.reminderSetDate), 'yyyy-MM-dd') !=
            util.formatDate(new Date(), 'yyyy-MM-dd')
          ) {
            return device
          }
        } else {
          return device
        }
      })

      // check mambu (Sanity checks) -- if client has already paid

      const endDay = new Date()

      if (devicesDue.length) {
        console.log('REMINDER DEVICES FOUND: ', +devicesDue.length)
      } else {
        return
      }

      devicesDue.forEach((device) => {
        duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
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
            const days = util.daysBetween(response.nextLockDate, new Date())
            console.log('=================')
            console.log(days)
            console.log('=================')
            if (days <= 1) {
              duerClass.setReminders(app, device)
            } else {
              // duerClass.setLockDate(app, device, response)
            }
          } else {
            // send reminders
            duerClass.setReminders(app, device)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}
