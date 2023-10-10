import { logger } from '../../logger'
import Mambu from '../../mambu'
import { Payment } from './payment.dt'

const reminder: Payment = {
  handleError(error) {
    logger.error(error)
  },
  getActiveLoans(app) {
    return app.service('loan')._find({
      query: {
        status: 'ACTIVE',
        // mambuSynced: false,
        $or: [
          {
            mambuSyncedAt: {
              $lte: new Date().toISOString()
            }
          },
          {
            mambuSyncedAt: null as any
          }
        ]
      }
    })
  },
  getMambuLoan(loanIds) {
    const promise = loanIds.map((id) => {
      return new Mambu().getLoanInstallment(id)
    })
    return Promise.all(promise)
  },
  filterPaidInstallments(installments, sort) {
    const filtered = installments.filter(
      (installment) => installment.state === 'PAID' || installment.state == 'LATE'
    )
    if (sort) {
      return filtered.sort((a, b) => {
        return Number(a.number) - Number(b.number)
      })
    }
    return filtered
  },

  getExactDueDate(immediateInstallment: any) {
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)

    const paid = immediateInstallment.state === 'PAID' || immediateInstallment.state === 'LATE'
    const daysInMil = new Date(immediateInstallment.dueDate).valueOf() - today.valueOf()
    const days = Math.round(daysInMil / (1000 * 60 * 60 * 24))
    console.log(daysInMil / (1000 * 60 * 60 * 24))
    return { days, paid }
  },

  getPendingInstallments(installments, sort) {
    const filtered: any[] = installments.filter(
      (installment) =>
        installment.state === 'PENDING' ||
        installment.state === 'LATE' ||
        installment.state == 'PARTIALY_PAID'
    )
    if (sort) {
      return filtered.sort((a, b) => {
        return Number(a.number) - Number(b.number)
      })
    }
    return filtered
  },
  getNumberOfDaysToDue(installments) {
    const today = new Date()
    const installment = reminder.getPendingInstallments(installments, true)
    if (!installment.length) {
      // means loan has been paid for fully
      return {
        paidOff: true,
        days: 0,
        paid: true,
        daysToNextInstallment: 0
      }
    }
    const pendingInstallment = installment[0]
    const instalmentdueDate: string = pendingInstallment.dueDate
    const daysRemaining = new Date(instalmentdueDate).valueOf() - today.valueOf()
    const exactDueDate = reminder.getExactDueDate(pendingInstallment)

    return {
      paidOff: false,
      days: Math.round(daysRemaining / (1000 * 60 * 60 * 24)),
      paid: false,
      daysToNextInstallment: Math.round(daysRemaining / (1000 * 60 * 60 * 24))
    }

    // return
  },
  updateLoan(app, loan, data) {
    return app.service('loan')._patch(loan.id, data)
  }
}

export default reminder
