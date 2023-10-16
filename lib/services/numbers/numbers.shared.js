"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numbersClient = exports.numbersMethods = exports.numbersPath = void 0;
exports.numbersPath = 'numbers';
exports.numbersMethods = ['find', 'get', 'create', 'patch', 'remove'];
const numbersClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.numbersPath, connection.service(exports.numbersPath), {
        methods: exports.numbersMethods
    });
};
exports.numbersClient = numbersClient;
//# sourceMappingURL=numbers.shared.js.map