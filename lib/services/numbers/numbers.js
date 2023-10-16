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
exports.numbers = void 0;
const schema_1 = require("@feathersjs/schema");
const numbers_schema_1 = require("./numbers.schema");
const numbers_class_1 = require("./numbers.class");
const numbers_shared_1 = require("./numbers.shared");
__exportStar(require("./numbers.class"), exports);
__exportStar(require("./numbers.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const numbers = (app) => {
    // Register our service on the Feathers application
    app.use(numbers_shared_1.numbersPath, new numbers_class_1.NumbersService((0, numbers_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: numbers_shared_1.numbersMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(numbers_shared_1.numbersPath).hooks({
        around: {
            all: [schema_1.hooks.resolveExternal(numbers_schema_1.numbersExternalResolver), schema_1.hooks.resolveResult(numbers_schema_1.numbersResolver)]
        },
        before: {
            all: [schema_1.hooks.validateQuery(numbers_schema_1.numbersQueryValidator), schema_1.hooks.resolveQuery(numbers_schema_1.numbersQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(numbers_schema_1.numbersDataValidator), schema_1.hooks.resolveData(numbers_schema_1.numbersDataResolver)],
            patch: [schema_1.hooks.validateData(numbers_schema_1.numbersPatchValidator), schema_1.hooks.resolveData(numbers_schema_1.numbersPatchResolver)],
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
exports.numbers = numbers;
//# sourceMappingURL=numbers.js.map