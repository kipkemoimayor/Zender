"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disbursmentClient = exports.disbursmentMethods = exports.disbursmentPath = void 0;
exports.disbursmentPath = 'disbursment';
exports.disbursmentMethods = ['find', 'get', 'create', 'patch', 'remove'];
const disbursmentClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.disbursmentPath, connection.service(exports.disbursmentPath), {
        methods: exports.disbursmentMethods
    });
};
exports.disbursmentClient = disbursmentClient;
//# sourceMappingURL=disbursment.shared.js.map