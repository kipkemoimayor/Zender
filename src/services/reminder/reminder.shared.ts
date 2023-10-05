// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Reminder, ReminderData, ReminderPatch, ReminderQuery, ReminderService } from './reminder.class'

export type { Reminder, ReminderData, ReminderPatch, ReminderQuery }

export type ReminderClientService = Pick<
  ReminderService<Params<ReminderQuery>>,
  (typeof reminderMethods)[number]
>

export const reminderPath = 'reminder'

export const reminderMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const reminderClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(reminderPath, connection.service(reminderPath), {
    methods: reminderMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [reminderPath]: ReminderClientService
  }
}
