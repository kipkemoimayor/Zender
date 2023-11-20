import { Device, Loan } from '../../client'
import { Application } from '../../declarations'
import { logger } from '../../logger'
import Mambu from '../../mambu'
import { NuovoApi } from '../../nuovo/api'
import util from '../../utils'
import { LockDevice } from './lock'
import { Due, ReminderDue } from './payment.dt'
import reminder from './reminder'

export class DueReminder {
  constructor(private app: Application) {}

  getDeviceDueInOneDay() {
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() + 1)

    const from = util.formatDate(dateFrom, 'yyyy-MM-dd hh:mm:ss')
    console.log(from)

    const endDate = new Date()
    endDate.setDate(dateFrom.getDate() + 1)
    endDate.setHours(23, 59, 59, 0)

    const dateTo = util.formatDate(endDate, 'yyyy-MM-dd hh:mm:ss')
    console.log(dateTo)

    return this.app.service('device').find({
      query: {
        $and: [
          {
            nextLockDate: {
              $gte: from
            }
          },
          {
            nextLockDate: {
              $lte: dateTo
            }
          }
        ],
        status: 'ACTIVE'
      },
      paginate: false
    })
  }

  getLoansDueInOneDay(loans: number[]) {
    return this.app.service('loan').find({
      query: {
        $or: [
          {
            daysRemaining: {
              $lte: 1
            }
          },
          { daysRemaining: null as any }
        ],
        status: 'ACTIVE',
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

  async setReminders(app: Application, device: Device) {
    const days = Math.floor(new Date(device.nextLockDate).valueOf() / (1000 * 60 * 60 * 24))
    const mgs: string = days == 0 ? 'today' : 'tomorrow'
    const message: string = `Hello ${device.client.fullName}, Your Easy Phone Loan is due ${mgs}. Please make payment to avoid your phone being locked. Dial *619*11# . Easy Phone powered by Platinum Credit.`

    const scheduleTo = new Date()
    scheduleTo.setDate(scheduleTo.getDate() + 7)
    // set nuovo reminders
    new NuovoApi()
      .setReminder({
        message: message,
        deviceIds: [device.nuovoDeviceId]
      })
      .then(() => {
        app
          .service('reminder')
          ._create({
            type: days == 1 ? 1 : 2,
            deviceId: device.id,
            loanId: device.loan.id,
            message: message,
            sent: true
          })
          .catch((error) => {
            logger.error(
              JSON.stringify({
                level: 'error',
                message: 'FAILED TO CREATE REMINDER:LOCAL',
                data: error
              })
            )
          })

        // CREATE SMS

        this.createSms({
          message: message,
          destination: device.client.phoneNumber,
          direction: 'OUT',
          sent: false
        }).catch((error) => {
          logger.error(
            JSON.stringify({
              level: 'error',
              message: 'FAILED TO CREATE SMS:LOCAL',
              data: error
            })
          )
        })

        // UPDATE DEVICE
        app
          .service('device')
          ._patch(device.id, {
            reminderSet: true,
            reminderSetDate: new Date()
          })
          .catch((error) => {
            logger.error(
              JSON.stringify({
                level: 'error',
                message: 'FAILED TO UPDATED DEVICE REMINDER SET DATES:LOCAL',
                data: error
              })
            )
          })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  mapData(data: any[], mapKey: string) {
    return data.map((x) => x[mapKey])
  }

  async loanPaid(loanId: string): Promise<Due> {
    const installments = await new Mambu().getLoanInstallment(loanId)

    return reminder.getNumberOfDaysToDue(installments.installments)
  }

  async installmentPaid(loanId: string, device: Device): Promise<ReminderDue> {
    const mambuInstallments = await new Mambu().getLoanInstallment(loanId)

    // (
    //   util.formatDate(device.nextLockDate, 'yyyy-MM-dd hh:mm:ss') ===
    //   util.formatDate(new Date(installment.dueDate), 'yyyy-MM-dd hh:mm:ss')
    // )
    const installments = mambuInstallments.installments.filter((installment) => {
      return installment.number == device.scheduleNumber
    })

    const installment = installments[0]

    if (installment && installment.state === 'PAID') {
      // get next installmet
      const nextInstallment = mambuInstallments.installments.filter(
        (inst) => Number(inst.number) > Number(installment.number)
      )

      if (nextInstallment.length) {
        return {
          nextLockDate: util.dateToMidnight(nextInstallment[0].dueDate),
          installmentPaid: true,
          fullyPaid: false,
          number: +nextInstallment[0].number
        }
      } else {
        return {
          nextLockDate: null,
          installmentPaid: true,
          fullyPaid: true,
          number: 0
        }
      }
    } else {
      if (installment && new Date().valueOf() < util.dateToMidnight(installment.dueDate).valueOf()) {
        return {
          nextLockDate: util.dateToMidnight(installment.dueDate),
          installmentPaid: false,
          fullyPaid: false,
          number: +installment.number
        }
      } else {
        return {
          nextLockDate: null,
          installmentPaid: false,
          fullyPaid: false,
          number: null
        }
      }
    }
  }

  setLockDate(app: Application, device: Device, data: ReminderDue, locked: boolean = false) {
    new NuovoApi()
      .scheduleDeviceLock([device.nuovoDeviceId], data.nextLockDate)
      .then(() => {
        // update local device
        logger.info('UPDATED NUOVO LOCK DATES SUCCESSFULLY')
        app
          .service('device')
          ._patch(device.id, {
            lockDateSynced: true,
            initialLockDate: data.nextLockDate,
            nextLockDate: data.nextLockDate,
            locked: locked,
            scheduleNumber: data.number,
            lockReadyScheduleAt: data.nextLockDate
          })
          .catch((error) => {
            logger.error(
              JSON.stringify({
                level: 'error',
                message: 'FAILED TO UPDATED DEVICE LOCK DATES:LOCAL',
                data: error
              })
            )
          })
      })
      .catch((error) => {
        logger.error(
          JSON.stringify({
            level: 'error',
            message: 'FAILED TO UPDATED DEVICE LOCK DATES:NUOVO',
            data: error
          })
        )
      })
  }

  async handlePaymentAdjustment(device: Device) {
    const mambuInstallments = await new Mambu().getLoanInstallment(device.loan.accountId)

    const installments = mambuInstallments.installments.filter((installment) => {
      return installment.number == device.scheduleNumber
    })

    const installment = installments[0]

    const prevInstallment = mambuInstallments.installments.filter(
      (inst) => Number(inst.number) < Number(installment.number)
    )

    // lock device
    if (prevInstallment.length) {
      this.setLockDate(
        this.app,
        device,
        {
          nextLockDate: prevInstallment[0].dueDate,
          number: prevInstallment[0].number,
          fullyPaid: false,
          installmentPaid: false
        },
        new Date().getTime() > new Date(prevInstallment[0].dueDate).getTime()
      )
      // update device initial lock date
      await new NuovoApi().updateCustomer(device.nuovoDeviceId, {
        device: {
          first_lock_date: util.dateToMidnight(prevInstallment[0].dueDate)
        }
      })
      await util.sleep(5000)

      if (new Date().getTime() > new Date(prevInstallment[0].dueDate).getTime()) {
        new LockDevice(this.app)
          .lockDevice([device.nuovoDeviceId])
          .then(() => {
            console.log('DEVICE LOCKED SUCCESSFULLY:ADJUSTMENT')
            // record history
            this.app.service('device-lock-history').create({
              deviceId: device.id,
              reason: 'PAYMENT ADJUSTED',
              loanId: device.loan.id,
              type: 1,
              lockedAt: new Date()
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
