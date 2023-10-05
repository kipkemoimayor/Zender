import { Application } from '../declarations'
import reminder from '../hooks/payments/reminder'

const schedule = require('node-schedule')

export const paymentJob = (app: Application) => {
  const job = schedule.scheduleJob('*/1 * * * *', async function () {
    console.log('payment scheduler running!')
    try {
      const loans = await reminder.getActiveLoans(app)

      const encodedKeys = loans.data.map((loan) => loan.encodedKey).filter((key) => key)

      if (!encodedKeys.length) {
        return
      }

      const mambuLoans = await reminder.getMambuLoan(encodedKeys)

      const endDay = new Date()
      endDay.setMilliseconds(0)
      endDay.setMinutes(59)
      endDay.setHours(23)
      endDay.setSeconds(59)

      mambuLoans.forEach((installment) => {
        const dueDate = reminder.getNumberOfDaysToDue(installment.installments)

        const loan = loans.data.find(
          (loan) => loan.encodedKey === installment.installments[0].parentAccountKey
        )
        if (loan) {
          reminder.updateLoan(app, loan, {
            mambuSyncedAt: endDay,
            mambuSynced: true,
            daysRemaining: dueDate.days,
            paid: dueDate.paid,
            daysToNextInstallment: dueDate.daysToNextInstallment,
            paidOff: dueDate.paidOff
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
}
