"use strict";
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockDevice = void 0;
const schema_1 = require("@feathersjs/schema");
const lock_device_schema_1 = require("./lock-device.schema");
const lock_device_class_1 = require("./lock-device.class");
const lock_device_shared_1 = require("./lock-device.shared");
const unlock_device_1 = require("../../hooks/device/unlock-device");
__exportStar(require("./lock-device.class"), exports);
__exportStar(require("./lock-device.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const lockDevice = (app) => {
    // Register our service on the Feathers application
    app.use(lock_device_shared_1.lockDevicePath, new lock_device_class_1.LockDeviceService((0, lock_device_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: lock_device_shared_1.lockDeviceMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(lock_device_shared_1.lockDevicePath).hooks({
        around: {
            all: [
                schema_1.hooks.resolveExternal(lock_device_schema_1.lockDeviceExternalResolver),
                schema_1.hooks.resolveResult(lock_device_schema_1.lockDeviceResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(lock_device_schema_1.lockDeviceQueryValidator),
                schema_1.hooks.resolveQuery(lock_device_schema_1.lockDeviceQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(lock_device_schema_1.lockDeviceDataValidator),
                schema_1.hooks.resolveData(lock_device_schema_1.lockDeviceDataResolver),
                unlock_device_1.handleRepyamentHook
            ],
            patch: [
                schema_1.hooks.validateData(lock_device_schema_1.lockDevicePatchValidator),
                schema_1.hooks.resolveData(lock_device_schema_1.lockDevicePatchResolver)
            ],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.lockDevice = lockDevice;
//# sourceMappingURL=lock-device.js.map