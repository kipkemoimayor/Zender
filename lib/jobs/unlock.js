"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlockJob = void 0;
const dueReminder_1 = require("../hooks/payments/dueReminder");
const lock_1 = require("../hooks/payments/lock");
const reminder_1 = __importDefault(require("../hooks/payments/reminder"));
const schedule = require('node-schedule');
const unlockJob = (app) => {
    //RUNS EVERY TWO MINS
    const job = schedule.scheduleJob('*/2 * * * *', async function () {
        console.log('UN:LOCK SCHEDULER RUNNNING');
        try {
            const lockClass = new lock_1.LockDevice(app);
            const duerClass = new dueReminder_1.DueReminder(app);
            const devices = await lockClass.fetchLockedDevices();
            if (!devices.length)
                return;
            // check repaymentt
            const endDay = new Date();
            endDay.setMilliseconds(0);
            endDay.setMinutes(59);
            endDay.setHours(23);
            endDay.setSeconds(59);
            devices.forEach((device) => {
                duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
                    console.log('HERE=========================');
                    console.log(response);
                    console.log('HERE=========================');
                    if (response.nextLockDate) {
                        //update loan
                        reminder_1.default.updateLoan(app, device.loan, {
                            mambuSyncedAt: endDay,
                            mambuSynced: true,
                            daysToNextInstallment: Math.floor(new Date(response.nextLockDate).valueOf() / (1000 * 60 * 60 * 24))
                        });
                        // update lock schedule
                        duerClass.setLockDate(app, device, response);
                        // record history
                        app.service('device-lock-history').create({
                            deviceId: device.id,
                            reason: 'REPAYMENT',
                            loanId: device.loan.id,
                            type: 2,
                            unlockedAt: new Date()
                        });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.unlockJob = unlockJob;
//# sourceMappingURL=unlock.js.map