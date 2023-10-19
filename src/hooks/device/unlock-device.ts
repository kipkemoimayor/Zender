// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../declarations'
import { DueReminder } from '../payments/dueReminder'
import reminder from '../payments/reminder'

export const handleRepyamentHook = async (context: HookContext) => {
  console.log(`Running hook unlock-hook on ${context.path}.${context.method}`)
  const { data, app } = context
  const duerClass = new DueReminder(app)

  const device = await app.service('device').find({
    query: {
      imei: data.imei
    }
  })

  if (device.data && data.type == 'REPAYMENT') {
    try {
      // check repaymentt
      const endDay = new Date()
      endDay.setMilliseconds(0)
      endDay.setMinutes(59)
      endDay.setHours(23)
      endDay.setSeconds(59)

      device.data.forEach((device) => {
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
            const locked = new Date().valueOf() > new Date(response.nextLockDate).valueOf()

            // update lock schedule
            duerClass.setLockDate(app, device, response, locked)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  } else if (data.type == 'REPAYMENTADJUSTED' && device.data) {
    //
    duerClass.handlePaymentAdjustment(device.data[0])
  }
}
