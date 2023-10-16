"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEntryClient = exports.appEntryMethods = exports.appEntryPath = void 0;
exports.appEntryPath = 'app-entry';
exports.appEntryMethods = ['find', 'get', 'create', 'patch', 'remove'];
const appEntryClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.appEntryPath, connection.service(exports.appEntryPath), {
        methods: exports.appEntryMethods
    });
};
exports.appEntryClient = appEntryClient;
//# sourceMappingURL=app-entry.shared.js.map