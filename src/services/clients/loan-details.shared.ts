// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  LoanDetails,
  LoanDetailsData,
  LoanDetailsPatch,
  LoanDetailsQuery,
  LoanDetailsService
} from './loan-details.class'

export type { LoanDetails, LoanDetailsData, LoanDetailsPatch, LoanDetailsQuery }

export type LoanDetailsClientService = Pick<
  LoanDetailsService<Params<LoanDetailsQuery>>,
  (typeof loanDetailsMethods)[number]
>

export const loanDetailsPath = 'client'

export const loanDetailsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const loanDetailsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(loanDetailsPath, connection.service(loanDetailsPath), {
    methods: loanDetailsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [loanDetailsPath]: LoanDetailsClientService
  }
}
