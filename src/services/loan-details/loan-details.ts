// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  loanDetailsDataValidator,
  loanDetailsPatchValidator,
  loanDetailsQueryValidator,
  loanDetailsResolver,
  loanDetailsExternalResolver,
  loanDetailsDataResolver,
  loanDetailsPatchResolver,
  loanDetailsQueryResolver
} from './loan-details.schema'

import type { Application } from '../../declarations'
import { LoanDetailsService, getOptions } from './loan-details.class'
import { loanDetailsPath, loanDetailsMethods } from './loan-details.shared'
import { handleLoan } from '../../hooks/handle-loan'
import { query } from '../../hooks/query'

export * from './loan-details.class'
export * from './loan-details.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const loanDetails = (app: Application) => {
  // Register our service on the Feathers application
  app.use(loanDetailsPath, new LoanDetailsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: loanDetailsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(loanDetailsPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(loanDetailsExternalResolver),
        schemaHooks.resolveResult(loanDetailsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(loanDetailsQueryValidator),
        schemaHooks.resolveQuery(loanDetailsQueryResolver)
      ],
      find: [
        query
      ],
      get: [],
      create: [
        // schemaHooks.validateData(loanDetailsDataValidator),
        // schemaHooks.resolveData(loanDetailsDataResolver),
        handleLoan
      ],
      patch: [
        schemaHooks.validateData(loanDetailsPatchValidator),
        schemaHooks.resolveData(loanDetailsPatchResolver)
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
    [loanDetailsPath]: LoanDetailsService
  }
}
