"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
const feathers_1 = require("@feathersjs/feathers");
const authentication_client_1 = __importDefault(require("@feathersjs/authentication-client"));
const numbers_shared_1 = require("./services/numbers/numbers.shared");
const disbursment_shared_1 = require("./services/disbursment/disbursment.shared");
const lock_device_shared_1 = require("./services/lock-device/lock-device.shared");
const device_lock_history_shared_1 = require("./services/device-lock-history/device-lock-history.shared");
const sent_sms_shared_1 = require("./services/sent-sms/sent-sms.shared");
const sms_queue_shared_1 = require("./services/sms-queue/sms-queue.shared");
const reminder_shared_1 = require("./services/reminder/reminder.shared");
const device_shared_1 = require("./services/device/device.shared");
const loan_shared_1 = require("./services/loan/loan.shared");
const app_entry_shared_1 = require("./services/app-entry/app-entry.shared");
const loan_details_shared_1 = require("./services/clients/loan-details.shared");
/**
 * Returns a typed client for the offer-letters app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
const createClient = (connection, authenticationOptions = {}) => {
    const client = (0, feathers_1.feathers)();
    client.configure(connection);
    client.configure((0, authentication_client_1.default)(authenticationOptions));
    client.set('connection', connection);
    client.configure(loan_details_shared_1.loanDetailsClient);
    client.configure(app_entry_shared_1.appEntryClient);
    client.configure(loan_shared_1.loanClient);
    client.configure(device_shared_1.deviceClient);
    client.configure(reminder_shared_1.reminderClient);
    client.configure(sms_queue_shared_1.smsQueueClient);
    client.configure(sent_sms_shared_1.sentSmsClient);
    client.configure(device_lock_history_shared_1.deviceLockHistoryClient);
    client.configure(lock_device_shared_1.lockDeviceClient);
    client.configure(disbursment_shared_1.disbursmentClient);
    client.configure(numbers_shared_1.numbersClient);
    client.configure(numbers_shared_1.numbersClient);
    return client;
};
exports.createClient = createClient;
//# sourceMappingURL=client.js.map