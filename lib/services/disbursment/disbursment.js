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
exports.disbursment = void 0;
const schema_1 = require("@feathersjs/schema");
const disbursment_schema_1 = require("./disbursment.schema");
const disbursment_class_1 = require("./disbursment.class");
const disbursment_shared_1 = require("./disbursment.shared");
const new_disbursment_1 = require("../../hooks/disbursment/new-disbursment");
__exportStar(require("./disbursment.class"), exports);
__exportStar(require("./disbursment.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const disbursment = (app) => {
    // Register our service on the Feathers application
    app.use(disbursment_shared_1.disbursmentPath, new disbursment_class_1.DisbursmentService((0, disbursment_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: disbursment_shared_1.disbursmentMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(disbursment_shared_1.disbursmentPath).hooks({
        around: {
            all: [
                schema_1.hooks.resolveExternal(disbursment_schema_1.disbursmentExternalResolver),
                schema_1.hooks.resolveResult(disbursment_schema_1.disbursmentResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(disbursment_schema_1.disbursmentQueryValidator),
                schema_1.hooks.resolveQuery(disbursment_schema_1.disbursmentQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                new_disbursment_1.handleDisbursmentHook,
                schema_1.hooks.validateData(disbursment_schema_1.disbursmentDataValidator),
                schema_1.hooks.resolveData(disbursment_schema_1.disbursmentDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(disbursment_schema_1.disbursmentPatchValidator),
                schema_1.hooks.resolveData(disbursment_schema_1.disbursmentPatchResolver)
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
exports.disbursment = disbursment;
//# sourceMappingURL=disbursment.js.map