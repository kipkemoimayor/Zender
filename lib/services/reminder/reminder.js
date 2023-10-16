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
exports.reminder = void 0;
const feathers_hooks_common_1 = require("feathers-hooks-common");
const schema_1 = require("@feathersjs/schema");
const reminder_schema_1 = require("./reminder.schema");
const reminder_class_1 = require("./reminder.class");
const reminder_shared_1 = require("./reminder.shared");
const mambuAuth_1 = require("../../hooks/auth/mambuAuth");
__exportStar(require("./reminder.class"), exports);
__exportStar(require("./reminder.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const reminder = (app) => {
    // Register our service on the Feathers application
    app.use(reminder_shared_1.reminderPath, new reminder_class_1.ReminderService((0, reminder_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: reminder_shared_1.reminderMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(reminder_shared_1.reminderPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(reminder_schema_1.reminderExternalResolver),
                schema_1.hooks.resolveResult(reminder_schema_1.reminderResolver),
                schema_1.hooks.resolveResult(reminder_schema_1.reminderResultResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(reminder_schema_1.reminderQueryValidator),
                schema_1.hooks.resolveQuery(reminder_schema_1.reminderQueryResolver)
            ],
            find: [
                (0, feathers_hooks_common_1.iff)((0, feathers_hooks_common_1.isProvider)('external'), (context) => {
                    context.ROLEACTION = 'canViewReminders';
                    return context;
                }, mambuAuth_1.mambuAuth)
            ],
            get: [],
            create: [
                schema_1.hooks.validateData(reminder_schema_1.reminderDataValidator),
                schema_1.hooks.resolveData(reminder_schema_1.reminderDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(reminder_schema_1.reminderPatchValidator),
                schema_1.hooks.resolveData(reminder_schema_1.reminderPatchResolver)
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
exports.reminder = reminder;
//# sourceMappingURL=reminder.js.map