import { loan } from './loan/loan'
import { appEntry } from './app-entry/app-entry'
import { loanDetails } from './clients/loan-details'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(loan)
  app.configure(appEntry)
  app.configure(loanDetails)
  // All services will be registered here
}
