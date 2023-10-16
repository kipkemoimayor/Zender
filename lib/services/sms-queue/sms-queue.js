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
exports.smsQueue = void 0;
const schema_1 = require("@feathersjs/schema");
const sms_queue_schema_1 = require("./sms-queue.schema");
const sms_queue_class_1 = require("./sms-queue.class");
const sms_queue_shared_1 = require("./sms-queue.shared");
__exportStar(require("./sms-queue.class"), exports);
__exportStar(require("./sms-queue.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const smsQueue = (app) => {
    // Register our service on the Feathers application
    app.use(sms_queue_shared_1.smsQueuePath, new sms_queue_class_1.SmsQueueService((0, sms_queue_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: sms_queue_shared_1.smsQueueMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(sms_queue_shared_1.smsQueuePath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(sms_queue_schema_1.smsQueueExternalResolver),
                schema_1.hooks.resolveResult(sms_queue_schema_1.smsQueueResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(sms_queue_schema_1.smsQueueQueryValidator),
                schema_1.hooks.resolveQuery(sms_queue_schema_1.smsQueueQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(sms_queue_schema_1.smsQueueDataValidator),
                schema_1.hooks.resolveData(sms_queue_schema_1.smsQueueDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(sms_queue_schema_1.smsQueuePatchValidator),
                schema_1.hooks.resolveData(sms_queue_schema_1.smsQueuePatchResolver)
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
exports.smsQueue = smsQueue;
//# sourceMappingURL=sms-queue.js.map