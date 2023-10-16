"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentSmsClient = exports.sentSmsMethods = exports.sentSmsPath = void 0;
exports.sentSmsPath = 'sent-sms';
exports.sentSmsMethods = ['find', 'get', 'create', 'patch', 'remove'];
const sentSmsClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.sentSmsPath, connection.service(exports.sentSmsPath), {
        methods: exports.sentSmsMethods
    });
};
exports.sentSmsClient = sentSmsClient;
//# sourceMappingURL=sent-sms.shared.js.map