// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Loan, LoanData, LoanPatch, LoanQuery, LoanService } from './loan.class'

export type { Loan, LoanData, LoanPatch, LoanQuery }

export type LoanClientService = Pick<LoanService<Params<LoanQuery>>, (typeof loanMethods)[number]>

export const loanPath = 'loan'

export const loanMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const loanClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(loanPath, connection.service(loanPath), {
    methods: loanMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [loanPath]: LoanClientService
  }
}
