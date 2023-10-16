"use strict";
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
exports.deviceLockHistory = void 0;
const feathers_hooks_common_1 = require("feathers-hooks-common");
const schema_1 = require("@feathersjs/schema");
const device_lock_history_schema_1 = require("./device-lock-history.schema");
const device_lock_history_class_1 = require("./device-lock-history.class");
const device_lock_history_shared_1 = require("./device-lock-history.shared");
const mambuAuth_1 = require("../../hooks/auth/mambuAuth");
__exportStar(require("./device-lock-history.class"), exports);
__exportStar(require("./device-lock-history.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const deviceLockHistory = (app) => {
    // Register our service on the Feathers application
    app.use(device_lock_history_shared_1.deviceLockHistoryPath, new device_lock_history_class_1.DeviceLockHistoryService((0, device_lock_history_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: device_lock_history_shared_1.deviceLockHistoryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(device_lock_history_shared_1.deviceLockHistoryPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(device_lock_history_schema_1.deviceLockHistoryExternalResolver),
                schema_1.hooks.resolveResult(device_lock_history_schema_1.deviceLockHistoryResolver),
                schema_1.hooks.resolveResult(device_lock_history_schema_1.lockHistoryResultResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(device_lock_history_schema_1.deviceLockHistoryQueryValidator),
                schema_1.hooks.resolveQuery(device_lock_history_schema_1.deviceLockHistoryQueryResolver)
            ],
            find: [
                (0, feathers_hooks_common_1.iff)((0, feathers_hooks_common_1.isProvider)('external'), (context) => {
                    context.ROLEACTION = 'canViewLockHistory';
                    return context;
                }, mambuAuth_1.mambuAuth)
            ],
            get: [],
            create: [
                schema_1.hooks.validateData(device_lock_history_schema_1.deviceLockHistoryDataValidator),
                schema_1.hooks.resolveData(device_lock_history_schema_1.deviceLockHistoryDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(device_lock_history_schema_1.deviceLockHistoryPatchValidator),
                schema_1.hooks.resolveData(device_lock_history_schema_1.deviceLockHistoryPatchResolver)
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
exports.deviceLockHistory = deviceLockHistory;
//# sourceMappingURL=device-lock-history.js.map