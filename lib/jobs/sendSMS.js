"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsJob = void 0;
const sms_1 = require("../hooks/payments/sms");
const schedule = require('node-schedule');
const smsJob = (app) => {
    const job = schedule.scheduleJob('*/5 * * * *', async function () {
        console.log('SMS SCHEDULER RUNNING');
        const smsClass = new sms_1.SMS(app);
        const queuedSMS = await smsClass.getQueuedSms();
        if (!queuedSMS.length) {
            return;
        }
        queuedSMS.forEach((sms) => {
            //send sms
            smsClass.sendSms({ destination: sms.destination, message: sms.message }).then(() => {
                // move sms
                smsClass.moveSentSms(sms);
            });
        });
        try {
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.smsJob = smsJob;
//# sourceMappingURL=sendSMS.js.map