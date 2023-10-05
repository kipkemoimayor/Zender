// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  deviceLockHistoryDataValidator,
  deviceLockHistoryPatchValidator,
  deviceLockHistoryQueryValidator,
  deviceLockHistoryResolver,
  deviceLockHistoryExternalResolver,
  deviceLockHistoryDataResolver,
  deviceLockHistoryPatchResolver,
  deviceLockHistoryQueryResolver,
  lockHistoryResultResolver
} from './device-lock-history.schema'

import type { Application } from '../../declarations'
import { DeviceLockHistoryService, getOptions } from './device-lock-history.class'
import { deviceLockHistoryPath, deviceLockHistoryMethods } from './device-lock-history.shared'

export * from './device-lock-history.class'
export * from './device-lock-history.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const deviceLockHistory = (app: Application) => {
  // Register our service on the Feathers application
  app.use(deviceLockHistoryPath, new DeviceLockHistoryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: deviceLockHistoryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(deviceLockHistoryPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(deviceLockHistoryExternalResolver),
        schemaHooks.resolveResult(deviceLockHistoryResolver),
        schemaHooks.resolveResult(lockHistoryResultResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(deviceLockHistoryQueryValidator),
        schemaHooks.resolveQuery(deviceLockHistoryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(deviceLockHistoryDataValidator),
        schemaHooks.resolveData(deviceLockHistoryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(deviceLockHistoryPatchValidator),
        schemaHooks.resolveData(deviceLockHistoryPatchResolver)
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
    [deviceLockHistoryPath]: DeviceLockHistoryService
  }
}
