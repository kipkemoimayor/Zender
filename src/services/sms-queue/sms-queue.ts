// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  smsQueueDataValidator,
  smsQueuePatchValidator,
  smsQueueQueryValidator,
  smsQueueResolver,
  smsQueueExternalResolver,
  smsQueueDataResolver,
  smsQueuePatchResolver,
  smsQueueQueryResolver
} from './sms-queue.schema'

import type { Application } from '../../declarations'
import { SmsQueueService, getOptions } from './sms-queue.class'
import { smsQueuePath, smsQueueMethods } from './sms-queue.shared'
import { ipAuthHook } from '../../hooks/auth/ipFilter'

export * from './sms-queue.class'
export * from './sms-queue.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const smsQueue = (app: Application) => {
  // Register our service on the Feathers application
  app.use(smsQueuePath, new SmsQueueService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: smsQueueMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(smsQueuePath).hooks({
    around: {
      all: [
        ipAuthHook,
        authenticate('jwt'),
        schemaHooks.resolveExternal(smsQueueExternalResolver),
        schemaHooks.resolveResult(smsQueueResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(smsQueueQueryValidator),
        schemaHooks.resolveQuery(smsQueueQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(smsQueueDataValidator),
        schemaHooks.resolveData(smsQueueDataResolver)
      ],
      patch: [
        schemaHooks.validateData(smsQueuePatchValidator),
        schemaHooks.resolveData(smsQueuePatchResolver)
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
    [smsQueuePath]: SmsQueueService
  }
}
