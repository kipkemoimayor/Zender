"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceClient = exports.deviceMethods = exports.devicePath = void 0;
exports.devicePath = 'device';
exports.deviceMethods = ['find', 'get', 'create', 'patch', 'remove'];
const deviceClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.devicePath, connection.service(exports.devicePath), {
        methods: exports.deviceMethods
    });
};
exports.deviceClient = deviceClient;
//# sourceMappingURL=device.shared.js.map