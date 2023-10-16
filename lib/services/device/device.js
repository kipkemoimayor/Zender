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
exports.device = void 0;
const feathers_hooks_common_1 = require("feathers-hooks-common");
const schema_1 = require("@feathersjs/schema");
const device_schema_1 = require("./device.schema");
const device_class_1 = require("./device.class");
const device_shared_1 = require("./device.shared");
const format_query_1 = require("../../hooks/format-query");
const mambuAuth_1 = require("../../hooks/auth/mambuAuth");
const numbers_1 = require("../../hooks/numbers");
__exportStar(require("./device.class"), exports);
__exportStar(require("./device.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const device = (app) => {
    // Register our service on the Feathers application
    app.use(device_shared_1.devicePath, new device_class_1.DeviceService((0, device_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: device_shared_1.deviceMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(device_shared_1.devicePath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(device_schema_1.deviceExternalResolver),
                schema_1.hooks.resolveResult(device_schema_1.deviceResolver),
                schema_1.hooks.resolveResult(device_schema_1.deviceResultResolver)
            ]
        },
        before: {
            all: [
                format_query_1.formatQuery,
                schema_1.hooks.validateQuery(device_schema_1.deviceQueryValidator),
                schema_1.hooks.resolveQuery(device_schema_1.deviceQueryResolver)
            ],
            find: [
                (0, feathers_hooks_common_1.iff)((0, feathers_hooks_common_1.isProvider)('external'), (context) => {
                    if (context.params.query && context.params.query.getStats) {
                        context.getStats = true;
                        delete context.params.query.getStats;
                    }
                    context.ROLEACTION = 'canViewDevices';
                    return context;
                }, mambuAuth_1.mambuAuth, numbers_1.statiscticsHook)
            ],
            get: [],
            create: [schema_1.hooks.validateData(device_schema_1.deviceDataValidator), schema_1.hooks.resolveData(device_schema_1.deviceDataResolver)],
            patch: [schema_1.hooks.validateData(device_schema_1.devicePatchValidator), schema_1.hooks.resolveData(device_schema_1.devicePatchResolver)],
            remove: []
        },
        after: {
            all: [],
            get: []
        },
        error: {
            all: []
        }
    });
};
exports.device = device;
//# sourceMappingURL=device.js.map