// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery, AppEntryService } from './app-entry.class'

export type { AppEntry, AppEntryData, AppEntryPatch, AppEntryQuery }

export type AppEntryClientService = Pick<
  AppEntryService<Params<AppEntryQuery>>,
  (typeof appEntryMethods)[number]
>

export const appEntryPath = 'app-entry'

export const appEntryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const appEntryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(appEntryPath, connection.service(appEntryPath), {
    methods: appEntryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [appEntryPath]: AppEntryClientService
  }
}
