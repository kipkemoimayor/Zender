// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../../declarations'
import Mambu from '../../mambu'
import util from '../../utils'
import { DueReminder } from '../payments/dueReminder'

export const handleDisbursmentHook = async (context: HookContext) => {
  console.log(`Running hook installemt-disbursment on ${context.path}.${context.method}`)
  const { data, app } = context
  const duerClass = new DueReminder(app)

  const device = await app.service('device').find({
    query: {
      imei: data.imei
    }
  })

  if (device.data.length) {
    // get installments

    const clientInstallments = await new Mambu().getLoanInstallment(data.loanAccountId)
    const installment = clientInstallments.installments[0]

    const deviceDetail = device.data[0]
    if (
      util.formatDate(deviceDetail.nextLockDate, 'yyyy-MM-dd hh:mm:ss') !=
      util.formatDate(new Date(installment.dueDate), 'yyyy-MM-dd hh:mm:ss')
    ) {
      // adjust next lock date to new lock date
      duerClass.setLockDate(app, deviceDetail, {
        fullyPaid: false,
        installmentPaid: false,
        nextLockDate: installment.dueDate,
        number: installment.number
      })
    }
  }
}
