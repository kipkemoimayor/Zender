// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { ipListClient } from './services/ip-list/ip-list.shared'
export type { IpList, IpListData, IpListQuery, IpListPatch } from './services/ip-list/ip-list.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { numbersClient } from './services/numbers/numbers.shared'
export type { Numbers, NumbersData, NumbersQuery, NumbersPatch } from './services/numbers/numbers.shared'

import { disbursmentClient } from './services/disbursment/disbursment.shared'
export type {
  Disbursment,
  DisbursmentData,
  DisbursmentQuery,
  DisbursmentPatch
} from './services/disbursment/disbursment.shared'

import { lockDeviceClient } from './services/lock-device/lock-device.shared'
export type {
  LockDevice,
  LockDeviceData,
  LockDeviceQuery,
  LockDevicePatch
} from './services/lock-device/lock-device.shared'

import { deviceLockHistoryClient } from './services/device-lock-history/device-lock-history.shared'
export type {
  DeviceLockHistory,
  DeviceLockHistoryData,
  DeviceLockHistoryQuery,
  DeviceLockHistoryPatch
} from './services/device-lock-history/device-lock-history.shared'

import { sentSmsClient } from './services/sent-sms/sent-sms.shared'
export type { SentSms, SentSmsData, SentSmsQuery, SentSmsPatch } from './services/sent-sms/sent-sms.shared'

import { smsQueueClient } from './services/sms-queue/sms-queue.shared'
export type {
  SmsQueue,
  SmsQueueData,
  SmsQueueQuery,
  SmsQueuePatch
} from './services/sms-queue/sms-queue.shared'

import { reminderClient } from './services/reminder/reminder.shared'
export type {
  Reminder,
  ReminderData,
  ReminderQuery,
  ReminderPatch
} from './services/reminder/reminder.shared'

import { deviceClient } from './services/device/device.shared'
export type { Device, DeviceData, DeviceQuery, DevicePatch } from './services/device/device.shared'

import { loanClient } from './services/loan/loan.shared'
export type { Loan, LoanData, LoanQuery, LoanPatch } from './services/loan/loan.shared'

import { appEntryClient } from './services/app-entry/app-entry.shared'
export type {
  AppEntry,
  AppEntryData,
  AppEntryQuery,
  AppEntryPatch
} from './services/app-entry/app-entry.shared'

import { loanDetailsClient } from './services/clients/loan-details.shared'
export type {
  LoanDetails,
  LoanDetailsData,
  LoanDetailsQuery,
  LoanDetailsPatch
} from './services/clients/loan-details.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the offer-letters app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(loanDetailsClient)
  client.configure(appEntryClient)
  client.configure(loanClient)
  client.configure(deviceClient)
  client.configure(reminderClient)
  client.configure(smsQueueClient)
  client.configure(sentSmsClient)
  client.configure(deviceLockHistoryClient)
  client.configure(lockDeviceClient)
  client.configure(disbursmentClient)
  client.configure(numbersClient)
  client.configure(numbersClient)
  client.configure(userClient)
  client.configure(ipListClient)
  return client
}
