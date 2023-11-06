// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { iff, isProvider } from 'feathers-hooks-common'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  deviceDataValidator,
  devicePatchValidator,
  deviceQueryValidator,
  deviceResolver,
  deviceExternalResolver,
  deviceDataResolver,
  devicePatchResolver,
  deviceQueryResolver,
  deviceResultResolver
} from './device.schema'

import type { Application } from '../../declarations'
import { DeviceService, getOptions } from './device.class'
import { devicePath, deviceMethods } from './device.shared'
import { formatQuery } from '../../hooks/format-query'
import { mambuAuth } from '../../hooks/auth/mambuAuth'
import { statiscticsHook } from '../../hooks/numbers'
import { ipAuthHook } from '../../hooks/auth/ipFilter'

export * from './device.class'
export * from './device.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const device = (app: Application) => {
  // Register our service on the Feathers application
  app.use(devicePath, new DeviceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: deviceMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(devicePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(deviceExternalResolver),
        schemaHooks.resolveResult(deviceResolver),
        schemaHooks.resolveResult(deviceResultResolver)
      ]
    },
    before: {
      all: [
        iff(isProvider('external'), formatQuery),
        schemaHooks.validateQuery(deviceQueryValidator),
        schemaHooks.resolveQuery(deviceQueryResolver)
      ],
      find: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        iff(
          isProvider('external'),
          (context) => {
            if (context.params.query && context.params.query.getStats) {
              context.getStats = true
              delete context.params.query.getStats
            }
            context.ROLEACTION = 'canViewDevices'
            return context
          },
          mambuAuth,
          statiscticsHook
        )
      ],
      get: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))],
      create: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(deviceDataValidator),
        schemaHooks.resolveData(deviceDataResolver)
      ],
      patch: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(devicePatchValidator),
        schemaHooks.resolveData(devicePatchResolver)
      ],
      remove: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))]
    },
    after: {
      all: [],
      get: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [devicePath]: DeviceService
  }
}
