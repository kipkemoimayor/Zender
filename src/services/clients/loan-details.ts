// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { iff, isProvider } from 'feathers-hooks-common'

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
import { query } from '../../hooks/query'
import { clientHook } from '../../hooks/client/client-hook'
import { discardData } from '../../hooks/dicardData'
import { formatQuery } from '../../hooks/format-query'
import { mambuAuth } from '../../hooks/auth/mambuAuth'
import { AuthHook } from '../../hooks/auth/auth'
import { ipAuthHook } from '../../hooks/auth/ipFilter'

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
        schemaHooks.resolveExternal(loanDetailsExternalResolver),
        schemaHooks.resolveResult(loanDetailsResolver)
      ]
    },
    before: {
      all: [
        iff(isProvider('external'), formatQuery),
        schemaHooks.validateQuery(loanDetailsQueryValidator),
        schemaHooks.resolveQuery(loanDetailsQueryResolver)
      ],
      find: [
        // query
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        iff(
          isProvider('external'),
          (context) => {
            context.ROLEACTION = 'canViewClients'
            return context
          },
          mambuAuth
        )
      ],
      get: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))],
      create: [
        AuthHook,
        schemaHooks.validateData(loanDetailsDataValidator),
        schemaHooks.resolveData(loanDetailsDataResolver),
        clientHook,
        discardData
      ],
      patch: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(loanDetailsPatchValidator),
        schemaHooks.resolveData(loanDetailsPatchResolver)
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
    [loanDetailsPath]: LoanDetailsService
  }
}
