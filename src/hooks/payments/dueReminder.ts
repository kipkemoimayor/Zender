import { Loan } from '../../client'
import { Application } from '../../declarations'
import { logger } from '../../logger'
import Mambu from '../../mambu'
import { changeDate } from '../../utils/date'
import { Due } from './payment.dt'
import reminder from './reminder'

export class DueReminder {
  constructor(private app: Application) {}

  getLoansDueInOneDay(loans: number[]) {
    return this.app.service('loan').find({
      query: {
        status: 'ACTIVE',
        daysRemaining: {
          $lte: 1
        },
        id: {
          $nin: loans
        }
      }
    })
  }

  createSms(data: any) {
    return this.app.service('sms-queue').create(data)
  }

  getLoans(loans: number[]) {
    return this.app.service('loan').find({
      query: {
        id: {
          $nin: loans
        }
      }
    })
  }

  getReminders(query?: any) {
    process.env.TZ = 'Africa/Nairobi'

    const startDate = new Date()
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)

    const nDate = startDate.toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi'
    })

    console.log(nDate)

    const endDay = new Date()
    endDay.setHours(23)
    endDay.setMinutes(59)
    endDay.setSeconds(59)

    console.log(startDate)
    console.log(endDay)

    const dDate = endDay.toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi'
    })

    console.log(startDate.toISOString())

    return this.app.service('reminder')._find({
      query: {
        // sent: true,
        ...query,
        $and: [{ createdAt: { $gt: startDate.toISOString() } }, { createdAt: { $lt: endDay.toISOString() } }]
      }
    })
  }

  async setReminders(app: Application, loan: Loan, reminder: Due) {
    const device = await app.service('device')._find({
      query: {
        loanId: loan.id
      }
    })
    if (device.total === 0) return
    const deviceId = device.data[0].id
    if (reminder.days == 0) {
      // update device
      const lockAtDate = changeDate(new Date(), 'endDay')
      app
        .service('device')
        ._patch(deviceId, { lockReady: true, lockReadyScheduleAt: lockAtDate })
        .catch((error) => {
          logger.error(
            JSON.stringify({ message: 'FAILED TO UPDATE DEVICE LOCK STATUS', level: 'error', data: error })
          )
        })
    }
    return app.service('reminder')._create({
      type: reminder.days == 1 ? 1 : 2,
      deviceId,
      loanId: loan.id
    })
  }

  mapData(data: any[], mapKey: string) {
    return data.map((x) => x[mapKey])
  }

  async loanPaid(loanId: string): Promise<Due> {
    const installments = await new Mambu().getLoanInstallment(loanId)

    return reminder.getNumberOfDaysToDue(installments.installments)
  }
}
