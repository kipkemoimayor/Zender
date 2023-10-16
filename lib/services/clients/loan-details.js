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
exports.loanDetails = void 0;
const feathers_hooks_common_1 = require("feathers-hooks-common");
const schema_1 = require("@feathersjs/schema");
const loan_details_schema_1 = require("./loan-details.schema");
const loan_details_class_1 = require("./loan-details.class");
const loan_details_shared_1 = require("./loan-details.shared");
const client_hook_1 = require("../../hooks/client/client-hook");
const create_loan_1 = require("../../hooks/loan/create-loan");
const dicardData_1 = require("../../hooks/dicardData");
const format_query_1 = require("../../hooks/format-query");
const mambuAuth_1 = require("../../hooks/auth/mambuAuth");
__exportStar(require("./loan-details.class"), exports);
__exportStar(require("./loan-details.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const loanDetails = (app) => {
    // Register our service on the Feathers application
    app.use(loan_details_shared_1.loanDetailsPath, new loan_details_class_1.LoanDetailsService((0, loan_details_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: loan_details_shared_1.loanDetailsMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(loan_details_shared_1.loanDetailsPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(loan_details_schema_1.loanDetailsExternalResolver),
                schema_1.hooks.resolveResult(loan_details_schema_1.loanDetailsResolver)
            ]
        },
        before: {
            all: [
                format_query_1.formatQuery,
                schema_1.hooks.validateQuery(loan_details_schema_1.loanDetailsQueryValidator),
                schema_1.hooks.resolveQuery(loan_details_schema_1.loanDetailsQueryResolver)
            ],
            find: [
                // query
                (0, feathers_hooks_common_1.iff)((0, feathers_hooks_common_1.isProvider)('external'), (context) => {
                    context.ROLEACTION = 'canViewClients';
                    return context;
                }, mambuAuth_1.mambuAuth)
            ],
            get: [],
            create: [
                schema_1.hooks.validateData(loan_details_schema_1.loanDetailsDataValidator),
                schema_1.hooks.resolveData(loan_details_schema_1.loanDetailsDataResolver),
                client_hook_1.clientHook,
                dicardData_1.discardData
            ],
            patch: [
                schema_1.hooks.validateData(loan_details_schema_1.loanDetailsPatchValidator),
                schema_1.hooks.resolveData(loan_details_schema_1.loanDetailsPatchResolver)
            ],
            remove: []
        },
        after: {
            all: [],
            create: [create_loan_1.createLoan]
        },
        error: {
            all: []
        }
    });
};
exports.loanDetails = loanDetails;
//# sourceMappingURL=loan-details.js.map