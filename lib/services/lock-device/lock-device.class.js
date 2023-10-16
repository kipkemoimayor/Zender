"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.LockDeviceService = void 0;
const errors_1 = require("@feathersjs/errors");
// This is a skeleton for a custom service class. Remove or add the methods you need here
class LockDeviceService {
    constructor(options) {
        this.options = options;
    }
    async find(_params) {
        throw new errors_1.MethodNotAllowed();
    }
    async get(id, _params) {
        throw new errors_1.MethodNotAllowed();
    }
    async create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map((current) => this.create(current, params)));
        }
        return {
            id: 0,
            ...data
        };
    }
    // This method has to be added to the 'methods' option to make it available to clients
    async update(id, data, _params) {
        throw new errors_1.MethodNotAllowed();
    }
    async patch(id, data, _params) {
        throw new errors_1.MethodNotAllowed();
    }
    async remove(id, _params) {
        throw new errors_1.MethodNotAllowed();
    }
}
exports.LockDeviceService = LockDeviceService;
const getOptions = (app) => {
    return { app };
};
exports.getOptions = getOptions;
//# sourceMappingURL=lock-device.class.js.map