"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientHook = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
const errors_1 = require("@feathersjs/errors");
const clientHook = async (context) => {
    console.log(`Running hook client-hook on ${context.path}.${context.method}`);
    const { data, app } = context;
    // validate if client already exist
    const client = await app.service('client').find({
        query: {
            idNumber: data.idNumber
        }
    });
    if (client.total > 0) {
        throw new errors_1.GeneralError('Client has already been registered');
    }
    //
    context.additionalData = {
        imei: data.imei,
        loanId: data.loanId
    };
    console.log(data);
};
exports.clientHook = clientHook;
//# sourceMappingURL=client-hook.js.map