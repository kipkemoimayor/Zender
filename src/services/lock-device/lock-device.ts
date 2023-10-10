// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  lockDeviceDataValidator,
  lockDevicePatchValidator,
  lockDeviceQueryValidator,
  lockDeviceResolver,
  lockDeviceExternalResolver,
  lockDeviceDataResolver,
  lockDevicePatchResolver,
  lockDeviceQueryResolver
} from './lock-device.schema'

import type { Application } from '../../declarations'
import { LockDeviceService, getOptions } from './lock-device.class'
import { lockDevicePath, lockDeviceMethods } from './lock-device.shared'
import { handleRepyamentHook } from '../../hooks/device/unlock-device'

export * from './lock-device.class'
export * from './lock-device.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const lockDevice = (app: Application) => {
  // Register our service on the Feathers application
  app.use(lockDevicePath, new LockDeviceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: lockDeviceMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(lockDevicePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(lockDeviceExternalResolver),
        schemaHooks.resolveResult(lockDeviceResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(lockDeviceQueryValidator),
        schemaHooks.resolveQuery(lockDeviceQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(lockDeviceDataValidator),
        schemaHooks.resolveData(lockDeviceDataResolver),
        handleRepyamentHook
      ],
      patch: [
        schemaHooks.validateData(lockDevicePatchValidator),
        schemaHooks.resolveData(lockDevicePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [lockDevicePath]: LockDeviceService
  }
}
