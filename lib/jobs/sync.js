"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncJob = void 0;
const sync_1 = __importDefault(require("../hooks/sync/sync"));
const utils_1 = __importDefault(require("../utils"));
const schedule = require('node-schedule');
const syncJob = (app) => {
    const job = schedule.scheduleJob('*/6 * * * *', async function () {
        console.log('SYNC SCHEDULER:RUNNING!');
        //check for failed device creation
        const failedDevices = await sync_1.default.getFailedDevices(app);
        // end of failed
        if (failedDevices.data.length) {
            failedDevices.data.forEach((loan) => {
                setTimeout(() => {
                    sync_1.default.searchAndCreateDevice(app, loan);
                }, 1000);
            });
        }
        const devices = await sync_1.default.getPendingDevices(app);
        console.log(devices);
        if (devices.total == 0) {
            return;
        }
        //
        const deviceSynced = sync_1.default.isSynced(devices.data[0]);
        if (deviceSynced) {
            return;
        }
        // sync data
        // Mambu-nuovo sync
        sync_1.default.syncMambuData(app, devices.data[0]);
        // Nuovo-mambu sync
        sync_1.default.syncNuovoData(app, devices.data[0]);
        // sleep
        await utils_1.default.sleep(2000);
        sync_1.default.syncLockDates(app, devices.data[0]);
    });
};
exports.syncJob = syncJob;
//# sourceMappingURL=sync.js.map