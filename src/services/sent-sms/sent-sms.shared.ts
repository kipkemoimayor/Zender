// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery, SentSmsService } from './sent-sms.class'

export type { SentSms, SentSmsData, SentSmsPatch, SentSmsQuery }

export type SentSmsClientService = Pick<SentSmsService<Params<SentSmsQuery>>, (typeof sentSmsMethods)[number]>

export const sentSmsPath = 'sent-sms'

export const sentSmsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const sentSmsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(sentSmsPath, connection.service(sentSmsPath), {
    methods: sentSmsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [sentSmsPath]: SentSmsClientService
  }
}
