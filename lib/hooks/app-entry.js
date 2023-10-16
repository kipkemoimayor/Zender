"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEntryHook = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
const errors_1 = require("@feathersjs/errors");
const utils_1 = __importDefault(require("../utils"));
const appEntryHook = async (context, next) => {
    console.log(`Running hook app-entry on ${context.path}.${context.method}`);
    const { method, data } = context;
    const { createHash, createSessionFile } = utils_1.default;
    if (method === 'create') {
        console.log('===========');
        console.log(data.signed_request);
        console.log('===========');
        const mambuSignedRequest = data.signed_request;
        if (!mambuSignedRequest) {
            throw new errors_1.NotAuthenticated('Not authenticated');
        }
        const encodedString = mambuSignedRequest.split('.')[1];
        console.log('\n\n-----------------');
        console.log(createHash(encodedString));
        if (mambuSignedRequest.split('.')[0] === createHash(encodedString)) {
            console.log(createHash(encodedString));
            createSessionFile(mambuSignedRequest);
            // context.method = 'GET'
            await next();
        }
        else {
            throw new errors_1.NotAuthenticated('Not authenticated');
        }
    }
    else {
        await next();
    }
    await next();
};
exports.appEntryHook = appEntryHook;
//# sourceMappingURL=app-entry.js.map