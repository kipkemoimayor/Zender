"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderClient = exports.reminderMethods = exports.reminderPath = void 0;
exports.reminderPath = 'reminder';
exports.reminderMethods = ['find', 'get', 'create', 'patch', 'remove'];
const reminderClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.reminderPath, connection.service(exports.reminderPath), {
        methods: exports.reminderMethods
    });
};
exports.reminderClient = reminderClient;
//# sourceMappingURL=reminder.shared.js.map