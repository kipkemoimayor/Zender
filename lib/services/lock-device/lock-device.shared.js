"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockDeviceClient = exports.lockDeviceMethods = exports.lockDevicePath = void 0;
exports.lockDevicePath = 'unlock-device';
exports.lockDeviceMethods = ['create'];
const lockDeviceClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.lockDevicePath, connection.service(exports.lockDevicePath), {
        methods: exports.lockDeviceMethods
    });
};
exports.lockDeviceClient = lockDeviceClient;
//# sourceMappingURL=lock-device.shared.js.map