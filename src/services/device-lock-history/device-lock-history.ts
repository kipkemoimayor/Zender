// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { iff, isProvider } from 'feathers-hooks-common'

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
import { mambuAuth } from '../../hooks/auth/mambuAuth'
import { ipAuthHook } from '../../hooks/auth/ipFilter'
import { formatQuery } from '../../hooks/format-query'

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
        schemaHooks.resolveExternal(deviceLockHistoryExternalResolver),
        schemaHooks.resolveResult(deviceLockHistoryResolver),
        schemaHooks.resolveResult(lockHistoryResultResolver)
      ]
    },
    before: {
      all: [
        iff(isProvider('external'), formatQuery),
        schemaHooks.validateQuery(deviceLockHistoryQueryValidator),
        schemaHooks.resolveQuery(deviceLockHistoryQueryResolver)
      ],
      find: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        iff(
          isProvider('external'),
          (context) => {
            context.ROLEACTION = 'canViewLockHistory'
            return context
          },
          mambuAuth
        )
      ],
      get: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))],
      create: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(deviceLockHistoryDataValidator),
        schemaHooks.resolveData(deviceLockHistoryDataResolver)
      ],
      patch: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(deviceLockHistoryPatchValidator),
        schemaHooks.resolveData(deviceLockHistoryPatchResolver)
      ],
      remove: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))]
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
