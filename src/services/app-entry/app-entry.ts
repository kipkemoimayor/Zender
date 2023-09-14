// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { AppEntryService, getOptions } from './app-entry.class'
import { appEntryPath, appEntryMethods } from './app-entry.shared'
import { appEntryHook } from '../../hooks/app-entry'

export * from './app-entry.class'

// A configure function that registers the service and its hooks via `app.configure`
export const appEntry = (app: Application) => {
  // Register our service on the Feathers application
  app.use(appEntryPath, new AppEntryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: appEntryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(appEntryPath).hooks({
    around: {
      all: [appEntryHook]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
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
    [appEntryPath]: AppEntryService
  }
}
