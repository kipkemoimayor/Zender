"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanClient = exports.loanMethods = exports.loanPath = void 0;
exports.loanPath = 'loan';
exports.loanMethods = ['find', 'get', 'create', 'patch', 'remove'];
const loanClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.loanPath, connection.service(exports.loanPath), {
        methods: exports.loanMethods
    });
};
exports.loanClient = loanClient;
//# sourceMappingURL=loan.shared.js.map