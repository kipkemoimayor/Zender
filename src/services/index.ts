import { ipList } from './ip-list/ip-list'
import { user } from './users/users'
import { sentSms } from './sent-sms/sent-sms'
import { smsQueue } from './sms-queue/sms-queue'
import { appEntry } from './app-entry/app-entry'
import { loanDetails } from './clients/loan-details'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(ipList)
  app.configure(user)
  app.configure(sentSms)
  app.configure(smsQueue)
  app.configure(appEntry)
  app.configure(loanDetails)
  // All services will be registered here
}
