// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  numbersDataValidator,
  numbersPatchValidator,
  numbersQueryValidator,
  numbersResolver,
  numbersExternalResolver,
  numbersDataResolver,
  numbersPatchResolver,
  numbersQueryResolver
} from './numbers.schema'

import type { Application } from '../../declarations'
import { NumbersService, getOptions } from './numbers.class'
import { numbersPath, numbersMethods } from './numbers.shared'
import { statiscticsHook } from '../../hooks/numbers'

export * from './numbers.class'
export * from './numbers.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const numbers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(numbersPath, new NumbersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: numbersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(numbersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(numbersExternalResolver), schemaHooks.resolveResult(numbersResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(numbersQueryValidator), schemaHooks.resolveQuery(numbersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(numbersDataValidator), schemaHooks.resolveData(numbersDataResolver)],
      patch: [schemaHooks.validateData(numbersPatchValidator), schemaHooks.resolveData(numbersPatchResolver)],
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
    [numbersPath]: NumbersService
  }
}
