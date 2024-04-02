// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  smsHookDataValidator,
  smsHookPatchValidator,
  smsHookQueryValidator,
  smsHookResolver,
  smsHookExternalResolver,
  smsHookDataResolver,
  smsHookPatchResolver,
  smsHookQueryResolver
} from './sms-hook.schema'

import type { Application } from '../../declarations'
import { SmsHookService, getOptions } from './sms-hook.class'
import { smsHookPath, smsHookMethods } from './sms-hook.shared'
import { handleSMs } from '../../hooks/sms/handle-sms'

export * from './sms-hook.class'
export * from './sms-hook.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const smsHook = (app: Application) => {
  // Register our service on the Feathers application
  app.use(smsHookPath, new SmsHookService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: smsHookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(smsHookPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),

        schemaHooks.resolveExternal(smsHookExternalResolver),
        schemaHooks.resolveResult(smsHookResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(smsHookQueryValidator), schemaHooks.resolveQuery(smsHookQueryResolver)],
      find: [],
      get: [],
      create: [
        handleSMs,
        schemaHooks.validateData(smsHookDataValidator),
        schemaHooks.resolveData(smsHookDataResolver)
      ],
      patch: [schemaHooks.validateData(smsHookPatchValidator), schemaHooks.resolveData(smsHookPatchResolver)],
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
    [smsHookPath]: SmsHookService
  }
}
