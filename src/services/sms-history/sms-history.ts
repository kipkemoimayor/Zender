// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  smsHistoryDataValidator,
  smsHistoryPatchValidator,
  smsHistoryQueryValidator,
  smsHistoryResolver,
  smsHistoryExternalResolver,
  smsHistoryDataResolver,
  smsHistoryPatchResolver,
  smsHistoryQueryResolver
} from './sms-history.schema'

import type { Application } from '../../declarations'
import { SmsHistoryService, getOptions } from './sms-history.class'
import { smsHistoryPath, smsHistoryMethods } from './sms-history.shared'

export * from './sms-history.class'
export * from './sms-history.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const smsHistory = (app: Application) => {
  // Register our service on the Feathers application
  app.use(smsHistoryPath, new SmsHistoryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: smsHistoryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(smsHistoryPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(smsHistoryExternalResolver),
        schemaHooks.resolveResult(smsHistoryResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(smsHistoryQueryValidator),
        schemaHooks.resolveQuery(smsHistoryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(smsHistoryDataValidator),
        schemaHooks.resolveData(smsHistoryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(smsHistoryPatchValidator),
        schemaHooks.resolveData(smsHistoryPatchResolver)
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
    [smsHistoryPath]: SmsHistoryService
  }
}
