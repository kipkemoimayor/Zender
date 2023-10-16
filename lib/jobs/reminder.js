"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderJob = void 0;
const dueReminder_1 = require("../hooks/payments/dueReminder");
const reminder_1 = __importDefault(require("../hooks/payments/reminder"));
const utils_1 = __importDefault(require("../utils"));
const schedule = require('node-schedule');
const reminderJob = (app) => {
    const job = schedule.scheduleJob('*/2 * * * *', async function () {
        console.log('REMINDER SCHEDULER:RUNNING');
        try {
            const duerClass = new dueReminder_1.DueReminder(app);
            const reminderDevices = await duerClass.getDeviceDueInOneDay();
            //filter out already sent reminders
            const devicesDue = reminderDevices.filter((device) => {
                if (device.reminderSet) {
                    if (!(utils_1.default.formatDate(new Date(device.reminderSetDate), 'yyyy-MM-dd') ==
                        utils_1.default.formatDate(new Date(), 'yyyy-MM-dd'))) {
                        return device;
                    }
                }
                else {
                    return device;
                }
            });
            // check mambu (Sanity checks) -- if client has already paid
            const endDay = new Date();
            endDay.setMilliseconds(0);
            endDay.setMinutes(59);
            endDay.setHours(23);
            endDay.setSeconds(59);
            devicesDue.forEach((device) => {
                duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
                    console.log(response);
                    if (response.nextLockDate) {
                        //update loan
                        reminder_1.default.updateLoan(app, device.loan, {
                            mambuSyncedAt: endDay,
                            mambuSynced: true,
                            daysToNextInstallment: Math.floor(new Date(response.nextLockDate).valueOf() / (1000 * 60 * 60 * 24))
                        });
                        // update lock schedule
                        duerClass.setLockDate(app, device, response);
                    }
                    else {
                        // send reminders
                        duerClass.setReminders(app, device);
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.reminderJob = reminderJob;
//# sourceMappingURL=reminder.js.map