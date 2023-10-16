import { numbers } from './numbers/numbers'
import { disbursment } from './disbursment/disbursment'
import { lockDevice } from './lock-device/lock-device'
import { deviceLockHistory } from './device-lock-history/device-lock-history'
import { sentSms } from './sent-sms/sent-sms'
import { smsQueue } from './sms-queue/sms-queue'
import { reminder } from './reminder/reminder'
import { device } from './device/device'
import { loan } from './loan/loan'
import { appEntry } from './app-entry/app-entry'
import { loanDetails } from './clients/loan-details'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(numbers)
  app.configure(disbursment)
  app.configure(lockDevice)
  app.configure(deviceLockHistory)
  app.configure(sentSms)
  app.configure(smsQueue)
  app.configure(reminder)
  app.configure(device)
  app.configure(loan)
  app.configure(appEntry)
  app.configure(loanDetails)
  // All services will be registered here
}
