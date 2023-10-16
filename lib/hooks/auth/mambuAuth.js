"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mambuAuth = exports.roles = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
const errors_1 = require("@feathersjs/errors");
const utils_1 = __importDefault(require("../../utils"));
exports.roles = {
    admin: {
        canViewClients: true,
        canViewDevices: true,
        canViewLockHistory: true,
        canViewReminders: true
    },
    adminOne: {
        canViewClients: true,
        canViewDevices: true
    },
    adminTwo: {
        canViewClients: true,
        canViewDevices: true
    }
};
const mambuAuth = async (context) => {
    console.log(`Running hook query on ${context.path}.${context.method}`);
    const { params, app } = context;
    const users = app.get('users');
    const { decodeString } = utils_1.default;
    const mambuUser = params.headers['mambuuser'];
    const userId = decodeString(mambuUser).USER_KEY;
    const userRole = users[userId];
    console.log('----------------');
    console.log(context.ROLEACTION);
    console.log('----------------');
    const canViewClients = exports.roles[userRole] && exports.roles[userRole][context.ROLEACTION];
    if (!canViewClients) {
        throw new errors_1.NotAuthenticated();
    }
};
exports.mambuAuth = mambuAuth;
//# sourceMappingURL=mambuAuth.js.map