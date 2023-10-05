// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  sentSmsDataValidator,
  sentSmsPatchValidator,
  sentSmsQueryValidator,
  sentSmsResolver,
  sentSmsExternalResolver,
  sentSmsDataResolver,
  sentSmsPatchResolver,
  sentSmsQueryResolver
} from './sent-sms.schema'

import type { Application } from '../../declarations'
import { SentSmsService, getOptions } from './sent-sms.class'
import { sentSmsPath, sentSmsMethods } from './sent-sms.shared'

export * from './sent-sms.class'
export * from './sent-sms.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const sentSms = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sentSmsPath, new SentSmsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sentSmsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sentSmsPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(sentSmsExternalResolver),
        schemaHooks.resolveResult(sentSmsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(sentSmsQueryValidator), schemaHooks.resolveQuery(sentSmsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(sentSmsDataValidator), schemaHooks.resolveData(sentSmsDataResolver)],
      patch: [schemaHooks.validateData(sentSmsPatchValidator), schemaHooks.resolveData(sentSmsPatchResolver)],
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
    [sentSmsPath]: SentSmsService
  }
}