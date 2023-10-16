"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const numbers_1 = require("./numbers/numbers");
const disbursment_1 = require("./disbursment/disbursment");
const lock_device_1 = require("./lock-device/lock-device");
const device_lock_history_1 = require("./device-lock-history/device-lock-history");
const sent_sms_1 = require("./sent-sms/sent-sms");
const sms_queue_1 = require("./sms-queue/sms-queue");
const reminder_1 = require("./reminder/reminder");
const device_1 = require("./device/device");
const loan_1 = require("./loan/loan");
const app_entry_1 = require("./app-entry/app-entry");
const loan_details_1 = require("./clients/loan-details");
const services = (app) => {
    app.configure(numbers_1.numbers);
    app.configure(disbursment_1.disbursment);
    app.configure(lock_device_1.lockDevice);
    app.configure(device_lock_history_1.deviceLockHistory);
    app.configure(sent_sms_1.sentSms);
    app.configure(sms_queue_1.smsQueue);
    app.configure(reminder_1.reminder);
    app.configure(device_1.device);
    app.configure(loan_1.loan);
    app.configure(app_entry_1.appEntry);
    app.configure(loan_details_1.loanDetails);
    // All services will be registered here
};
exports.services = services;
//# sourceMappingURL=index.js.map