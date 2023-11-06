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
import { authenticate } from '@feathersjs/authentication'
import { ipAuthHook } from '../../hooks/auth/ipFilter'
import { iff, isProvider } from 'feathers-hooks-common'

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
      find: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))],
      get: [iff(isProvider('external'), ipAuthHook, authenticate('jwt'))],
      create: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(numbersDataValidator),
        schemaHooks.resolveData(numbersDataResolver)
      ],
      patch: [
        iff(isProvider('external'), ipAuthHook, authenticate('jwt')),
        schemaHooks.validateData(numbersPatchValidator),
        schemaHooks.resolveData(numbersPatchResolver)
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
    [numbersPath]: NumbersService
  }
}
