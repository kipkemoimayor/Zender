// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ipListDataValidator,
  ipListPatchValidator,
  ipListQueryValidator,
  ipListResolver,
  ipListExternalResolver,
  ipListDataResolver,
  ipListPatchResolver,
  ipListQueryResolver
} from './ip-list.schema'

import type { Application } from '../../declarations'
import { IpListService, getOptions } from './ip-list.class'
import { ipListPath, ipListMethods } from './ip-list.shared'

export * from './ip-list.class'
export * from './ip-list.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ipList = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ipListPath, new IpListService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ipListMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ipListPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(ipListExternalResolver),
        schemaHooks.resolveResult(ipListResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(ipListQueryValidator), schemaHooks.resolveQuery(ipListQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(ipListDataValidator), schemaHooks.resolveData(ipListDataResolver)],
      patch: [schemaHooks.validateData(ipListPatchValidator), schemaHooks.resolveData(ipListPatchResolver)],
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
    [ipListPath]: IpListService
  }
}
