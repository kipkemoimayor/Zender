import { Paginated } from '@feathersjs/feathers'
import { Loan } from '../../client'
import { Application } from '../../declarations'

export interface Due {
  days: number
  paid: boolean
  daysToNextInstallment: number
  paidOff: boolean
}

export interface ReminderDue {
  nextLockDate: any
  installmentPaid: boolean
  fullyPaid: boolean
  number: any
}

export interface Payment {
  getActiveLoans: (app: Application) => Promise<Paginated<Loan>>
  getMambuLoan: (encodedKeys: string[]) => Promise<any[]>
  handleError: (error: Error) => void
  filterPaidInstallments: (installments: any[], sort?: boolean) => Array<any>
  getPendingInstallments: (installments: any[], sort?: boolean) => Array<any>
  getNumberOfDaysToDue: (installments: any[]) => Due
  updateLoan: (app: Application, loan: Loan, data?: any) => Promise<Loan>
  getExactDueDate: (installments: any[]) => { days: number; paid: boolean } | boolean
}
