// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  loanDataValidator,
  loanPatchValidator,
  loanQueryValidator,
  loanResolver,
  loanExternalResolver,
  loanDataResolver,
  loanPatchResolver,
  loanQueryResolver
} from './loan.schema'

import type { Application } from '../../declarations'
import { LoanService, getOptions } from './loan.class'
import { loanPath, loanMethods } from './loan.shared'

export * from './loan.class'
export * from './loan.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const loan = (app: Application) => {
  // Register our service on the Feathers application
  app.use(loanPath, new LoanService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: loanMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(loanPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(loanExternalResolver),
        schemaHooks.resolveResult(loanResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(loanQueryValidator), schemaHooks.resolveQuery(loanQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(loanDataValidator), schemaHooks.resolveData(loanDataResolver)],
      patch: [schemaHooks.validateData(loanPatchValidator), schemaHooks.resolveData(loanPatchResolver)],
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
    [loanPath]: LoanService
  }
}
