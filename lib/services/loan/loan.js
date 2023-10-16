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
exports.loan = void 0;
const schema_1 = require("@feathersjs/schema");
const loan_schema_1 = require("./loan.schema");
const loan_class_1 = require("./loan.class");
const loan_shared_1 = require("./loan.shared");
const add_device_1 = require("../../hooks/device/add-device");
__exportStar(require("./loan.class"), exports);
__exportStar(require("./loan.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const loan = (app) => {
    // Register our service on the Feathers application
    app.use(loan_shared_1.loanPath, new loan_class_1.LoanService((0, loan_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: loan_shared_1.loanMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(loan_shared_1.loanPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(loan_schema_1.loanExternalResolver),
                schema_1.hooks.resolveResult(loan_schema_1.loanResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(loan_schema_1.loanQueryValidator), schema_1.hooks.resolveQuery(loan_schema_1.loanQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(loan_schema_1.loanDataValidator), schema_1.hooks.resolveData(loan_schema_1.loanDataResolver)],
            patch: [schema_1.hooks.validateData(loan_schema_1.loanPatchValidator), schema_1.hooks.resolveData(loan_schema_1.loanPatchResolver)],
            remove: []
        },
        after: {
            all: [],
            create: [add_device_1.addDevice]
        },
        error: {
            all: []
        }
    });
};
exports.loan = loan;
//# sourceMappingURL=loan.js.map