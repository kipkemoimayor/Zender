import type { TransportConnection, Application } from '@feathersjs/feathers';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';
import './services/numbers/numbers.shared';
export type { Numbers, NumbersData, NumbersQuery, NumbersPatch } from './services/numbers/numbers.shared';
import './services/disbursment/disbursment.shared';
export type { Disbursment, DisbursmentData, DisbursmentQuery, DisbursmentPatch } from './services/disbursment/disbursment.shared';
import './services/lock-device/lock-device.shared';
export type { LockDevice, LockDeviceData, LockDeviceQuery, LockDevicePatch } from './services/lock-device/lock-device.shared';
import './services/device-lock-history/device-lock-history.shared';
export type { DeviceLockHistory, DeviceLockHistoryData, DeviceLockHistoryQuery, DeviceLockHistoryPatch } from './services/device-lock-history/device-lock-history.shared';
import './services/sent-sms/sent-sms.shared';
export type { SentSms, SentSmsData, SentSmsQuery, SentSmsPatch } from './services/sent-sms/sent-sms.shared';
import './services/sms-queue/sms-queue.shared';
export type { SmsQueue, SmsQueueData, SmsQueueQuery, SmsQueuePatch } from './services/sms-queue/sms-queue.shared';
import './services/reminder/reminder.shared';
export type { Reminder, ReminderData, ReminderQuery, ReminderPatch } from './services/reminder/reminder.shared';
import './services/device/device.shared';
export type { Device, DeviceData, DeviceQuery, DevicePatch } from './services/device/device.shared';
import './services/loan/loan.shared';
export type { Loan, LoanData, LoanQuery, LoanPatch } from './services/loan/loan.shared';
import './services/app-entry/app-entry.shared';
export type { AppEntry, AppEntryData, AppEntryQuery, AppEntryPatch } from './services/app-entry/app-entry.shared';
import './services/clients/loan-details.shared';
export type { LoanDetails, LoanDetailsData, LoanDetailsQuery, LoanDetailsPatch } from './services/clients/loan-details.shared';
export interface Configuration {
    connection: TransportConnection<ServiceTypes>;
}
export interface ServiceTypes {
}
export type ClientApplication = Application<ServiceTypes, Configuration>;
/**
 * Returns a typed client for the offer-letters app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export declare const createClient: <Configuration_1 = any>(connection: TransportConnection<ServiceTypes>, authenticationOptions?: Partial<AuthenticationClientOptions>) => ClientApplication;
