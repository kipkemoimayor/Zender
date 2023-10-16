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
exports.appEntry = void 0;
const app_entry_class_1 = require("./app-entry.class");
const app_entry_shared_1 = require("./app-entry.shared");
const app_entry_1 = require("../../hooks/app-entry");
__exportStar(require("./app-entry.class"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const appEntry = (app) => {
    // Register our service on the Feathers application
    app.use(app_entry_shared_1.appEntryPath, new app_entry_class_1.AppEntryService((0, app_entry_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: app_entry_shared_1.appEntryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(app_entry_shared_1.appEntryPath).hooks({
        around: {
            all: [app_entry_1.appEntryHook]
        },
        before: {
            all: [],
            find: [],
            get: [],
            create: [],
            patch: [],
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
exports.appEntry = appEntry;
//# sourceMappingURL=app-entry.js.map