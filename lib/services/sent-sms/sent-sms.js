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
exports.sentSms = void 0;
const schema_1 = require("@feathersjs/schema");
const sent_sms_schema_1 = require("./sent-sms.schema");
const sent_sms_class_1 = require("./sent-sms.class");
const sent_sms_shared_1 = require("./sent-sms.shared");
__exportStar(require("./sent-sms.class"), exports);
__exportStar(require("./sent-sms.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const sentSms = (app) => {
    // Register our service on the Feathers application
    app.use(sent_sms_shared_1.sentSmsPath, new sent_sms_class_1.SentSmsService((0, sent_sms_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: sent_sms_shared_1.sentSmsMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(sent_sms_shared_1.sentSmsPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(sent_sms_schema_1.sentSmsExternalResolver),
                schema_1.hooks.resolveResult(sent_sms_schema_1.sentSmsResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(sent_sms_schema_1.sentSmsQueryValidator), schema_1.hooks.resolveQuery(sent_sms_schema_1.sentSmsQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(sent_sms_schema_1.sentSmsDataValidator), schema_1.hooks.resolveData(sent_sms_schema_1.sentSmsDataResolver)],
            patch: [schema_1.hooks.validateData(sent_sms_schema_1.sentSmsPatchValidator), schema_1.hooks.resolveData(sent_sms_schema_1.sentSmsPatchResolver)],
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
exports.sentSms = sentSms;
//# sourceMappingURL=sent-sms.js.map