import { Application } from '../declarations'
import { DueReminder } from '../hooks/payments/dueReminder'
import reminder from '../hooks/payments/reminder'

const schedule = require('node-schedule')

export const reminderJob = (app: Application) => {
  const job = schedule.scheduleJob('*/1 * * * *', async function () {
    console.log('Reminder scheduler running')
    try {
      const duerClass = new DueReminder(app)

      const unsentReminders = await duerClass.getReminders({})

      const loanIds = duerClass.mapData(unsentReminders.data, 'loanId')

      console.log(loanIds)

      const reminderLoans = await duerClass.getLoansDueInOneDay(loanIds)

      console.log(reminderLoans)

      // check mambu (Sanity checks) -- if client has already paid

      const endDay = new Date()
      endDay.setMilliseconds(0)
      endDay.setMinutes(59)
      endDay.setHours(23)
      endDay.setSeconds(59)

      reminderLoans.data.forEach((loan) => {
        duerClass.loanPaid(loan.accountId).then((response) => {
          console.log(response)
          if (response.days > 1) {
            //update loan
            reminder.updateLoan(app, loan, {
              mambuSyncedAt: endDay,
              mambuSynced: true,
              daysRemaining: response.days,
              paid: response.paid,
              daysToNextInstallment: response.daysToNextInstallment,
              paidOff: response.paidOff
            })
          } else {
            // send reminders
            duerClass.setReminders(app, loan, response)
            const nextDay = new Date()
            nextDay.setDate(nextDay.getDate() + 1)
            nextDay.setMinutes(59)
            nextDay.setHours(23)
            nextDay.setSeconds(59)
            const mgs: string = response.days == 0 ? 'end of day' : nextDay.toLocaleDateString()
            // create sms
            duerClass.createSms({
              message: `Dear customer please note that you have an upcoming easy phone repayment, please ensure to pay before ${mgs}`,
              destination: loan.client.phoneNumber,
              direction: 'OUT'
            })
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}
