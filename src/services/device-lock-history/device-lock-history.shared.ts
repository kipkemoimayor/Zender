// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  DeviceLockHistory,
  DeviceLockHistoryData,
  DeviceLockHistoryPatch,
  DeviceLockHistoryQuery,
  DeviceLockHistoryService
} from './device-lock-history.class'

export type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryPatch, DeviceLockHistoryQuery }

export type DeviceLockHistoryClientService = Pick<
  DeviceLockHistoryService<Params<DeviceLockHistoryQuery>>,
  (typeof deviceLockHistoryMethods)[number]
>

export const deviceLockHistoryPath = 'device-lock-history'

export const deviceLockHistoryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const deviceLockHistoryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(deviceLockHistoryPath, connection.service(deviceLockHistoryPath), {
    methods: deviceLockHistoryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [deviceLockHistoryPath]: DeviceLockHistoryClientService
  }
}
