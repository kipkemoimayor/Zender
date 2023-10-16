"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockJob = void 0;
const lock_1 = require("../hooks/payments/lock");
const logger_1 = require("../logger");
const api_1 = require("../nuovo/api");
const schedule = require('node-schedule');
const lockJob = (app) => {
    //run every 5 mins
    const job = schedule.scheduleJob('*/5 * * * *', async function () {
        console.log('LOCK SCHEDULER:RUNNING');
        try {
            const lockClass = new lock_1.LockDevice(app);
            const devices = await lockClass.fetchAllPendingLocks();
            if (devices.length)
                logger_1.logger.info('DEVICE LOCKED FOUND');
            if (!devices.length)
                return;
            // FETCH NUOVO DEVICES
            devices.forEach((device) => {
                new api_1.NuovoApi().getDevice(device.nuovoDeviceId).then((response) => {
                    const nvDevice = response.device_info;
                    lockClass.updateOneDevice(device.id, {
                        locked: nvDevice.locked,
                        lastConnectedAt: new Date(nvDevice.last_connected_at)
                    });
                    // record history
                    app.service('device-lock-history').create({
                        deviceId: device.id,
                        reason: 'NO PAYMENT RECIEVED',
                        loanId: device.loan.id,
                        type: 1,
                        lockedAt: new Date()
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.lockJob = lockJob;
//# sourceMappingURL=lock.js.map