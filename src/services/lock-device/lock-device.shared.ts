// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  LockDevice,
  LockDeviceData,
  LockDevicePatch,
  LockDeviceQuery,
  LockDeviceService
} from './lock-device.class'

export type { LockDevice, LockDeviceData, LockDevicePatch, LockDeviceQuery }

export type LockDeviceClientService = Pick<
  LockDeviceService<Params<LockDeviceQuery>>,
  (typeof lockDeviceMethods)[number]
>

export const lockDevicePath = 'unlock-device'

export const lockDeviceMethods = ['create'] as const

export const lockDeviceClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(lockDevicePath, connection.service(lockDevicePath), {
    methods: lockDeviceMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [lockDevicePath]: LockDeviceClientService
  }
}
