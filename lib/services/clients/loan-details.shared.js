"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanDetailsClient = exports.loanDetailsMethods = exports.loanDetailsPath = void 0;
exports.loanDetailsPath = 'client';
exports.loanDetailsMethods = ['find', 'get', 'create', 'patch', 'remove'];
const loanDetailsClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.loanDetailsPath, connection.service(exports.loanDetailsPath), {
        methods: exports.loanDetailsMethods
    });
};
exports.loanDetailsClient = loanDetailsClient;
//# sourceMappingURL=loan-details.shared.js.map