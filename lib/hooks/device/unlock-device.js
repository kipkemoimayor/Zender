"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRepyamentHook = void 0;
const dueReminder_1 = require("../payments/dueReminder");
const reminder_1 = __importDefault(require("../payments/reminder"));
const handleRepyamentHook = async (context) => {
    console.log(`Running hook unlock-hook on ${context.path}.${context.method}`);
    const { data, app } = context;
    const duerClass = new dueReminder_1.DueReminder(app);
    const device = await app.service('device').find({
        query: {
            imei: data.imei
        }
    });
    if (device.data && data.type == 'REPAYMENT') {
        try {
            // check repaymentt
            const endDay = new Date();
            endDay.setMilliseconds(0);
            endDay.setMinutes(59);
            endDay.setHours(23);
            endDay.setSeconds(59);
            device.data.forEach((device) => {
                duerClass.installmentPaid(device.loan.accountId, device).then((response) => {
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
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (data.type == 'REPAYMENTADJUSTED' && device.data) {
        //
        duerClass.handlePaymentAdjustment(device.data[0]);
    }
};
exports.handleRepyamentHook = handleRepyamentHook;
//# sourceMappingURL=unlock-device.js.map