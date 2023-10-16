"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsQueueClient = exports.smsQueueMethods = exports.smsQueuePath = void 0;
exports.smsQueuePath = 'sms-queue';
exports.smsQueueMethods = ['find', 'get', 'create', 'patch', 'remove'];
const smsQueueClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.smsQueuePath, connection.service(exports.smsQueuePath), {
        methods: exports.smsQueueMethods
    });
};
exports.smsQueueClient = smsQueueClient;
//# sourceMappingURL=sms-queue.shared.js.map