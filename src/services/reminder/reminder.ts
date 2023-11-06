// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { iff, isProvider } from 'feathers-hooks-common'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  reminderDataValidator,
  reminderPatchValidator,
  reminderQueryValidator,
  reminderResolver,
  reminderExternalResolver,
  reminderDataResolver,
  reminderPatchResolver,
  reminderQueryResolver,
  reminderResultResolver
} from './reminder.schema'

import type { Application } from '../../declarations'
import { ReminderService, getOptions } from './reminder.class'
import { reminderPath, reminderMethods } from './reminder.shared'
import { mambuAuth } from '../../hooks/auth/mambuAuth'
import { ipAuthHook } from '../../hooks/auth/ipFilter'

export * from './reminder.class'
export * from './reminder.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const reminder = (app: Application) => {
  // Register our service on the Feathers application
  app.use(reminderPath, new ReminderService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: reminderMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reminderPath).hooks({
    around: {
      all: [
        ipAuthHook,
        authenticate('jwt'),
        schemaHooks.resolveExternal(reminderExternalResolver),
        schemaHooks.resolveResult(reminderResolver),
        schemaHooks.resolveResult(reminderResultResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(reminderQueryValidator),
        schemaHooks.resolveQuery(reminderQueryResolver)
      ],
      find: [
        iff(
          isProvider('external'),
          (context) => {
            context.ROLEACTION = 'canViewReminders'
            return context
          },
          mambuAuth
        )
      ],
      get: [],
      create: [
        schemaHooks.validateData(reminderDataValidator),
        schemaHooks.resolveData(reminderDataResolver)
      ],
      patch: [
        schemaHooks.validateData(reminderPatchValidator),
        schemaHooks.resolveData(reminderPatchResolver)
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
    [reminderPath]: ReminderService
  }
}
