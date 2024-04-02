// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { smsHookClient } from './services/sms-hook/sms-hook.shared'
export type { SmsHook, SmsHookData, SmsHookQuery, SmsHookPatch } from './services/sms-hook/sms-hook.shared'

import { smsHistoryClient } from './services/sms-history/sms-history.shared'
export type {
  SmsHistory,
  SmsHistoryData,
  SmsHistoryQuery,
  SmsHistoryPatch
} from './services/sms-history/sms-history.shared'

import { ipListClient } from './services/ip-list/ip-list.shared'
export type { IpList, IpListData, IpListQuery, IpListPatch } from './services/ip-list/ip-list.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { sentSmsClient } from './services/sent-sms/sent-sms.shared'
export type { SentSms, SentSmsData, SentSmsQuery, SentSmsPatch } from './services/sent-sms/sent-sms.shared'

import { smsQueueClient } from './services/sms-queue/sms-queue.shared'
export type {
  SmsQueue,
  SmsQueueData,
  SmsQueueQuery,
  SmsQueuePatch
} from './services/sms-queue/sms-queue.shared'

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
  client.configure(smsQueueClient)
  client.configure(sentSmsClient)
  client.configure(userClient)
  client.configure(ipListClient)
  client.configure(smsHistoryClient)
  client.configure(smsHookClient)
  return client
}
