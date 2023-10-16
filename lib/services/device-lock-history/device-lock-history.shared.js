"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceLockHistoryClient = exports.deviceLockHistoryMethods = exports.deviceLockHistoryPath = void 0;
exports.deviceLockHistoryPath = 'device-lock-history';
exports.deviceLockHistoryMethods = ['find', 'get', 'create', 'patch', 'remove'];
const deviceLockHistoryClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.deviceLockHistoryPath, connection.service(exports.deviceLockHistoryPath), {
        methods: exports.deviceLockHistoryMethods
    });
};
exports.deviceLockHistoryClient = deviceLockHistoryClient;
//# sourceMappingURL=device-lock-history.shared.js.map