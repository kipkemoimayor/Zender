// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery, SmsQueueService } from './sms-queue.class'

export type { SmsQueue, SmsQueueData, SmsQueuePatch, SmsQueueQuery }

export type SmsQueueClientService = Pick<
  SmsQueueService<Params<SmsQueueQuery>>,
  (typeof smsQueueMethods)[number]
>

export const smsQueuePath = 'sms-queue'

export const smsQueueMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const smsQueueClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(smsQueuePath, connection.service(smsQueuePath), {
    methods: smsQueueMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [smsQueuePath]: SmsQueueClientService
  }
}
