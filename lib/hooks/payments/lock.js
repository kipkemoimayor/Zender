"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockDevice = void 0;
const api_1 = require("../../nuovo/api");
const utils_1 = __importDefault(require("../../utils"));
class LockDevice {
    constructor(app) {
        this.app = app;
    }
    fetchAllPendingLocks() {
        return this.app.service('device').find({
            query: {
                reminderSet: true,
                locked: false,
                nextLockDate: {
                    $lte: utils_1.default.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
                }
            },
            paginate: false
        });
    }
    fetchLockedDevices() {
        return this.app.service('device').find({
            query: {
                locked: true
            },
            paginate: false
        });
    }
    saveLockHistory(data) {
        return this.app.service('device-lock-history')._create(data);
    }
    lockDevice(deviceId) {
        return new api_1.NuovoApi().lockDevice(deviceId);
    }
    unlockDevice(deviceId) {
        return new api_1.NuovoApi().unlockDevice(deviceId);
    }
    updateDevice(devicesId) {
        this.app.service('device')._patch(null, { locked: true }, {
            query: {
                id: {
                    $in: devicesId
                }
            }
        });
    }
    updateOneDevice(deviceId, data) {
        return this.app.service('device')._patch(deviceId, data);
    }
    applyLock(nuovoDeviceId, devices, lockType) {
        if (lockType == 'lock') {
            this.lockDevice(nuovoDeviceId).then((response) => {
                // update device
                let deviceIds = devices.map((device) => device.id);
                this.updateDevice(deviceIds);
                devices.forEach((device) => {
                    this.saveLockHistory({
                        reason: 'late payment',
                        lockedAt: new Date(),
                        deviceId: device.id,
                        loanId: device.loanId
                    });
                });
            });
        }
        else {
        }
    }
}
exports.LockDevice = LockDevice;
//# sourceMappingURL=lock.js.map