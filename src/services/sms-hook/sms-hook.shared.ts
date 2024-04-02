// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { SmsHook, SmsHookData, SmsHookPatch, SmsHookQuery, SmsHookService } from './sms-hook.class'

export type { SmsHook, SmsHookData, SmsHookPatch, SmsHookQuery }

export type SmsHookClientService = Pick<SmsHookService<Params<SmsHookQuery>>, (typeof smsHookMethods)[number]>

export const smsHookPath = 'sms-hook'

export const smsHookMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const smsHookClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(smsHookPath, connection.service(smsHookPath), {
    methods: smsHookMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [smsHookPath]: SmsHookClientService
  }
}
