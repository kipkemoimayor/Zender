// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

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
  return client
}
