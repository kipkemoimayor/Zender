"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHook = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
const errors_1 = require("@feathersjs/errors");
const AuthHook = async (context) => {
    console.log(`Running hook client-hook on ${context.path}.${context.method}`);
    const { params } = context;
    const auth = params.headers.authorization;
    if (!auth) {
        throw new errors_1.NotAuthenticated('Invalid authentication');
    }
    try {
        const authDetails = auth.split(' ')[1];
        let plain = Buffer.from(authDetails, 'base64').toString('utf8');
        const password = plain.split(':')[1];
        const username = plain.split(':')[0];
        if (username !== 'admin' || password !== 'Admin@!') {
            throw new errors_1.NotAuthenticated('Invalid authentication');
        }
    }
    catch (error) {
        throw new errors_1.NotAuthenticated('Invalid authentication');
    }
};
exports.AuthHook = AuthHook;
//# sourceMappingURL=auth.js.map