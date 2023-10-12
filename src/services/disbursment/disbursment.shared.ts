// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Disbursment,
  DisbursmentData,
  DisbursmentPatch,
  DisbursmentQuery,
  DisbursmentService
} from './disbursment.class'

export type { Disbursment, DisbursmentData, DisbursmentPatch, DisbursmentQuery }

export type DisbursmentClientService = Pick<
  DisbursmentService<Params<DisbursmentQuery>>,
  (typeof disbursmentMethods)[number]
>

export const disbursmentPath = 'disbursment'

export const disbursmentMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const disbursmentClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(disbursmentPath, connection.service(disbursmentPath), {
    methods: disbursmentMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [disbursmentPath]: DisbursmentClientService
  }
}
