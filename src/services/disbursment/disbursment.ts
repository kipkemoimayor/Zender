// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  disbursmentDataValidator,
  disbursmentPatchValidator,
  disbursmentQueryValidator,
  disbursmentResolver,
  disbursmentExternalResolver,
  disbursmentDataResolver,
  disbursmentPatchResolver,
  disbursmentQueryResolver
} from './disbursment.schema'

import type { Application } from '../../declarations'
import { DisbursmentService, getOptions } from './disbursment.class'
import { disbursmentPath, disbursmentMethods } from './disbursment.shared'
import { handleDisbursmentHook } from '../../hooks/disbursment/new-disbursment'
import { AuthHook } from '../../hooks/auth/auth'

export * from './disbursment.class'
export * from './disbursment.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const disbursment = (app: Application) => {
  // Register our service on the Feathers application
  app.use(disbursmentPath, new DisbursmentService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: disbursmentMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(disbursmentPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(disbursmentExternalResolver),
        schemaHooks.resolveResult(disbursmentResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(disbursmentQueryValidator),
        schemaHooks.resolveQuery(disbursmentQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        AuthHook,
        handleDisbursmentHook,
        schemaHooks.validateData(disbursmentDataValidator),
        schemaHooks.resolveData(disbursmentDataResolver)
      ],
      patch: [
        schemaHooks.validateData(disbursmentPatchValidator),
        schemaHooks.resolveData(disbursmentPatchResolver)
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
    [disbursmentPath]: DisbursmentService
  }
}
