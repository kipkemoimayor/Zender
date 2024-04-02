// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  SmsHistory,
  SmsHistoryData,
  SmsHistoryPatch,
  SmsHistoryQuery,
  SmsHistoryService
} from './sms-history.class'

export type { SmsHistory, SmsHistoryData, SmsHistoryPatch, SmsHistoryQuery }

export type SmsHistoryClientService = Pick<
  SmsHistoryService<Params<SmsHistoryQuery>>,
  (typeof smsHistoryMethods)[number]
>

export const smsHistoryPath = 'sms-history'

export const smsHistoryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const smsHistoryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(smsHistoryPath, connection.service(smsHistoryPath), {
    methods: smsHistoryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [smsHistoryPath]: SmsHistoryClientService
  }
}
